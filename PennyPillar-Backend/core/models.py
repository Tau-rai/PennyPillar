"""Module for defining the models of the core app."""
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from datetime import datetime


class UserProfile(models.Model):
    """Model for the user profile."""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_pics', default='palceholder.img')

    class Meta:
        verbose_name = "UserProfile"
        verbose_name_plural = "UserProfiles"

    def __str__(self):
        return f"{self.user.username} Profile"


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
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    month = models.DateField()
    budget_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f'{self.user.username} - {self.month.strftime("%B %Y")}'

    def get_expenditure(self):
        # Retrieve the category object for 'Expenses'
        try:
            expense_category = Category.objects.get(name='Expenses')
        except Category.DoesNotExist:
            return 0  # Or handle this case as needed

        # Calculate the total expenditure for this month
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

    def __str__(self):
        return f'{self.user.username} - Goal: {self.goal_amount}'

    def add_amount(self, amount):
        """Add an amount to current savings."""
        if amount > 0:
            self._current_savings += amount
            self.save()
    
    @property
    def current_savings(self):
        """Property to get the current savings balance."""
        return self.get_current_savings()
    
    @current_savings.setter
    def current_savings(self, value):
        """Setter method for the current savings balance."""
        self._current_savings = value

    def is_goal_reached(self):
        """Check if the goal has been reached or exceeded."""
        return self.current_savings >= self.goal_amount

    def get_remaining_amount(self):
        """Calculate the remaining amount to reach the goal."""
        return max(self.goal_amount - self.current_savings, 0)

    def get_current_savings(self):
        """Calculate the current savings balance."""
        # Retrieve the category object for 'Savings'
        try:
            savings_category = Category.objects.get(name='Savings')
        except Category.DoesNotExist:
            return 0 

        # Calculate the total savings for this user
        return Transaction.objects.filter(
            user=self.user,
            category=savings_category
        ).aggregate(total_savings=models.Sum('amount'))['total_savings'] or 0

    def clean(self):
        # Allow current date as valid goal_date
        if self.goal_date and self.goal_date < timezone.now().date():
            if self.goal_date != timezone.now().date():
                raise ValidationError('Goal date must be in the future.')

    def save(self, *args, **kwargs):
        """Override save method to perform additional validations."""
        self.clean()  # Call clean method to validate data
        super().save(*args, **kwargs)
