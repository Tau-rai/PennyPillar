"""Module for defining the urls of the core app."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    TransactionViewSet, CategoryViewSet, RegisterView, LoginView, LogoutView, UserProfileViewSet, MonthlyBudgetViewSet, SavingsGoalViewSet, SubscriptionViewSet, UserSummaryViewSet, InsightViewSet
)

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'monthly-budget', MonthlyBudgetViewSet, basename='monthlybudget')
router.register(r'profile', UserProfileViewSet, basename='userprofile')
router.register(r'savings-goal', SavingsGoalViewSet, basename='savingsgoal')
router.register(r'subscriptions', SubscriptionViewSet)
router.register(r'insights', InsightViewSet)
router.register(r'dashboard', UserSummaryViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
   path('logout/', LogoutView.as_view(), name='logout'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
