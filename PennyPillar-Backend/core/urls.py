"""Module for defining the urls of the core app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views
from .views import (
    TransactionViewSet, CategoryViewSet, RegisterView, LoginView, UserProfileViewSet, MonthlyBudgetViewSet, SavingsGoalViewSet
)

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'monthly-budget', MonthlyBudgetViewSet, basename='monthlybudget')
router.register(r'profile', UserProfileViewSet)
router.register(r'savings-goal', SavingsGoalViewSet, basename='savingsgoal')


urlpatterns = [
    path('', include(router.urls)),
    path('signup/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
