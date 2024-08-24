"""Test suite foe the Category, Budget, and Savings models."""
from decimal import Decimal
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from core.models import User, SavingsGoal, Subscription, Category, MonthlyBudget, Transaction


class FinanceAppTestSuite(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email="user@example.com", password="password123")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Set up for SavingsGoalViewSet
        self.savings_goal = SavingsGoal.objects.create(
            user=self.user,
            goal_amount=Decimal('1000.00'),
            goal_date=timezone.now().date(),
            current_savings=Decimal('200.00')
        )

        # Set up for SubscriptionViewSet
        self.subscription = Subscription.objects.create(
            user=self.user,
            name="Netflix",
            due_date=timezone.now().date(),
            is_paid=False
        )

        # Set up for CategoryViewSet
        self.category = Category.objects.create(
            user=self.user,
            name="Food",
            is_income=False
        )

        # Set up for MonthlyBudgetViewSet
        self.monthly_budget = MonthlyBudget.objects.create(
            user=self.user,
            month=timezone.now().date(),
            budget_amount=Decimal('2000.00')
        )
        self.transaction = Transaction.objects.create(
            user=self.user,
            category=self.category,
            amount=Decimal('500.00'),
            date=timezone.now().date()
        )

    # SavingsGoalViewSet Tests
    def test_get_savings_goal_queryset(self):
        response = self.client.get(reverse('savingsgoal-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['goal_amount'], '1000.00')

    def test_add_amount_valid(self):
        url = reverse('savingsgoal-add-amount')
        data = {"goal_amount": "500.00"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.savings_goal.refresh_from_db()
        self.assertEqual(self.savings_goal.goal_amount, Decimal('500.00'))

    def test_add_amount_invalid_format(self):
        url = reverse('savingsgoal-add-amount')
        data = {"goal_amount": "invalid_amount"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_check_goal_status(self):
        url = reverse('savingsgoal-check-goal-status')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['goal_amount'], '1000.00')
        self.assertEqual(response.data['current_savings'], '200.00')
        self.assertFalse(response.data['is_goal_reached'])

    def test_add_savings_valid(self):
        url = reverse('savingsgoal-add-savings')
        data = {"savings_amount": "300.00"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.savings_goal.refresh_from_db()
        self.assertEqual(self.savings_goal.current_savings, Decimal('500.00'))

    def test_add_savings_invalid_format(self):
        url = reverse('savingsgoal-add-savings')
        data = {"savings_amount": "invalid_amount"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # SubscriptionViewSet Tests
    def test_get_subscription_queryset(self):
        url = reverse('subscription-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Netflix")

    def test_filter_subscription_by_month_and_year(self):
        url = reverse('subscription-list')
        month = timezone.now().month
        year = timezone.now().year
        response = self.client.get(url, {'month': month, 'year': year})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_filter_subscription_invalid_month_or_year(self):
        url = reverse('subscription-list')
        response = self.client.get(url, {'month': 'invalid', 'year': 'invalid'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_mark_subscription_as_paid(self):
        url = reverse('subscription-mark-as-paid', args=[self.subscription.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.subscription.refresh_from_db()
        self.assertTrue(self.subscription.is_paid)

    def test_mark_subscription_as_paid_unauthorized(self):
        other_user = User.objects.create_user(email="other@example.com", password="password123")
        other_subscription = Subscription.objects.create(
            user=other_user,
            name="Hulu",
            due_date=timezone.now().date(),
            is_paid=False
        )
        url = reverse('subscription-mark-as-paid', args=[other_subscription.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # CategoryViewSet Tests
    def test_get_category_queryset(self):
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Food')

    def test_create_category(self):
        url = reverse('category-list')
        data = {"name": "Entertainment", "is_income": False}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 2)
        self.assertEqual(Category.objects.last().name, "Entertainment")

    def test_create_category_invalid(self):
        url = reverse('category-list')
        data = {"name": ""}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_category(self):
        url = reverse('category-detail', args=[self.category.id])
        data = {"name": "Groceries"}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.category.refresh_from_db()
        self.assertEqual(self.category.name, "Groceries")

    def test_delete_category(self):
        url = reverse('category-detail', args=[self.category.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), 0)

    # MonthlyBudgetViewSet Tests
    def test_get_monthly_budget_queryset(self):
        url = reverse('monthlybudget-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['budget_amount'], '2000.00')

    def test_check_budget_status(self):
        url = reverse('monthlybudget-check-budget-status')
        response = self.client.get(url, {'month': timezone.now().month, 'year': timezone.now().year})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['budget_amount'], '2000.00')
        self.assertEqual(response.data['expenditure'], '500.00')
        self.assertFalse(response.data['is_over_budget'])

    def test_create_monthly_budget(self):
        url = reverse('monthlybudget-list')
        data = {"month": timezone.now().date(), "budget_amount": "1500.00"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MonthlyBudget.objects.count(), 2)
        self.assertEqual(MonthlyBudget.objects.last().budget_amount, Decimal('1500.00'))

    def test_create_monthly_budget_invalid(self):
        url = reverse('monthlybudget-list')
        data = {"month": "", "budget_amount": ""}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_monthly_budget(self):
        url = reverse('monthlybudget-detail', args=[self.monthly_budget.id])
        data = {"budget_amount": "2500.00"}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.monthly_budget.refresh_from_db()
        self.assertEqual(self.monthly_budget.budget_amount, Decimal('2500.00'))

    def test_delete_monthly_budget(self):
        url = reverse('monthlybudget-detail', args=[self.monthly_budget.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MonthlyBudget.objects.count(), 0)


if __name__ == '__main__':
    pass