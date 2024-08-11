"""Module for defining the models of the core app."""
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    """Model for the category of a transaction."""
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    """Model for the subcategory of a transaction."""
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "SubCategory"
        verbose_name_plural = "SubCategories"

    def __str__(self):
        return self.name

class Transaction(models.Model):
    """Model for a transaction."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, blank=True)
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
                verbose_name_plural = "Incomes"
    

class Expense(Transaction):
        """Model for an expense transaction."""    
        class Meta:
            verbose_name = "Expense"
            verbose_name_plural = "Expenses"