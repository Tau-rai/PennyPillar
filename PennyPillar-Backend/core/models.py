"""Module for defining the models of the core app."""
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import datetime
from decimal import Decimal
import requests
from django.core.files.base import ContentFile


class UserProfile(models.Model):
    """Model for the user profile."""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    username = models.CharField(max_length=150, blank=True, null=True)  # Add this line
    image = models.ImageField(upload_to='profile_pics', blank=True, null=True)

    class Meta:
        verbose_name = "UserProfile"
        verbose_name_plural = "UserProfiles"

    def __str__(self):
        return f"{self.user.username} Profile"

    def save(self, *args, **kwargs):
        # Automatically set the email and username fields from the related User object
        self.email = self.user.email
        self.username = self.user.username  # Set username here

        # Set placeholder image if no image is provided
        if not self.image:
            placeholder_url = 'https://via.placeholder.com/150'
            response = requests.get(placeholder_url)
            if response.status_code == 200:
                self.image.save('placeholder.jpg', ContentFile(response.content), save=False)

        super().save(*args, **kwargs)


class Category(models.Model):
    """Model for the category of a transaction."""
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Transaction(models.Model):
    """Model for a transaction."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    description = models.TextField()

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"

    def __str__(self):
        return f"{self.description} - {self.amount}"


class Income(Transaction):
    """Model for an income transaction."""        
    class Meta:
        verbose_name = "Income"
        verbose_name_plural = "Income"
    

class Expense(Transaction):
    """Model for an expense transaction."""    
    class Meta:
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"


class MonthlyBudget(models.Model):
    """Monthly budget model"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    month = models.DateField()
    budget_amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('user', 'month')  # Ensure uniqueness of user-month combination

    def __str__(self):
        return f'{self.user.username} - {self.month.strftime("%B %Y")}'

    def get_expenditure(self):
        try:
            expense_category = Category.objects.get(name='Expenses')
        except Category.DoesNotExist:
            return 0

        return Transaction.objects.filter(
            user=self.user,
            category=expense_category,
            date__month=self.month.month,
            date__year=self.month.year
        ).aggregate(total_expenditure=models.Sum('amount'))['total_expenditure'] or 0

    def is_over_budget(self):
        return self.get_expenditure() > self.budget_amount

    def get_remaining_budget(self):
        return self.budget_amount - self.get_expenditure()

class SavingsGoal(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    goal_date = models.DateField()
    current_savings = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f'{self.user.username} - Goal: {self.goal_amount}'

    def add_amount(self, amount):
        """Add an amount to current savings."""
        if amount > 0:
            self.current_savings += Decimal(amount)
            self.save()
    
    def subtract_amount(self, amount):
        """Subtract an amount from current savings."""
        if amount > 0:
            self.current_savings -= Decimal(amount)
            self.save()

    def is_goal_reached(self):
        """Check if the goal has been reached or exceeded."""
        return self.current_savings >= self.goal_amount

    def get_remaining_amount(self):
        """Calculate the remaining amount to reach the goal."""
        return max(self.goal_amount - self.current_savings, Decimal(0))

    def clean(self):
        # Allow current date as valid goal_date
        if self.goal_date and self.goal_date < timezone.now().date():
            if self.goal_date != timezone.now().date():
                raise ValidationError('Goal date must be in the future.')

    def save(self, *args, **kwargs):
        """Override save method to perform additional validations."""
        self.clean()  # Call clean method to validate data
        super().save(*args, **kwargs)

class Subscription(models.Model):
    """Subscription model."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    frequency = models.CharField(max_length=20)
    payment_method = models.CharField(max_length=20)
    due_date = models.DateField()
    is_paid = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.name} - {self.amount} ({self.frequency})"
    
    def next_due_date(self):
        """Calculate the next due date based on frequency."""
        if self.frequency == 'monthly':
            return self.due_date + timezone.timedelta(days=30)
        elif self.frequency == 'weekly':
            return self.due_date + timezone.timedelta(weeks=1)
        elif self.frequency == 'yearly':
            return self.due_date + timezone.timedelta(days=365)
        return self.due_date  # Default to current due date


class Insight(models.Model):
    """Insights model."""
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
