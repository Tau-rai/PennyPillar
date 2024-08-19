"""Module for views of the core app."""
from datetime import datetime
from django.contrib.auth.models import User
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets, permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from decimal import Decimal
from .models import Category, MonthlyBudget, Transaction, SavingsGoal, UserProfile, Subscription, Insight
from .serializers import (CategorySerializer, LoginSerializer,
                          MonthlyBudgetSerializer, RegisterSerializer,
                          TransactionSerializer, UserProfileSerializer, SavingsGoalSerializer, SubscriptionSerializer, Insights Serializer)


class UserProfileViewSet(viewsets.ModelViewSet):
    """User profile view."""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        """Filter user profile by the current user."""
        user = self.request.user
        if user.is_authenticated:
            return UserProfile.objects.filter(user=user)
        return UserProfile.objects.none()

    def update(self, request, *args, **kwargs):
        """Handle profile updates."""
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Update the User model fields if needed
        if 'first_name' in request.data or 'last_name' in request.data:
            user = user_profile.user
            if 'first_name' in request.data:
                user.first_name = request.data['first_name']
            if 'last_name' in request.data:
                user.last_name = request.data['last_name']
            user.save()

        return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    """Register view."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        """User registration."""
        user = serializer.save()
        password = self.request.data.get('password')
        user.set_password(password)
        user.save()

    def create(self, request, *args, **kwargs):
        """Handle user registration and token generation."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate a token for the registered user
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        
        # Return user data and token
        return Response({
            'user': RegisterSerializer(user).data,
            'token': token
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    """Login view."""
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """Login post method."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        token = validated_data.get('token')
        
        return Response({'token': token}, status=status.HTTP_200_OK)


class TransactionViewSet(viewsets.ModelViewSet):
    """Transaction view."""
    queryset = Transaction.objects.none()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        """Filter transactions by the current user."""
        user = self.request.user
        if user.is_authenticated:
            return Transaction.objects.filter(user=user)
        return Transaction.objects.none()

    def perform_create(self, serializer):
        """Set the user field"""
        serializer.save(user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    Category view
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def perform_create(self, serializer):
        """Set the user field."""
        serializer.save(user=self.request.user)


class MonthlyBudgetViewSet(viewsets.ModelViewSet):
    """Monthly budget view."""
    queryset = MonthlyBudget.objects.none()
    serializer_class = MonthlyBudgetSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            month_str = self.request.query_params.get('month', timezone.now().date().replace(day=1).strftime('%Y-%m-%d'))
            if month_str:
                try:
                    # Expect 'YYYY-MM-DD' format by default
                    month = datetime.strptime(month_str, '%Y-%m-%d').date().replace(day=1)
                    return MonthlyBudget.objects.filter(user=user, month__year=month.year, month__month=month.month)
                except ValueError:
                    return MonthlyBudget.objects.none()  # Handle invalid month format
        return MonthlyBudget.objects.none()

    @action(detail=False, methods=['get'])
    def check_budget_status(self, request):
        """Check the budget status for the current month."""
        user = request.user
        month_str = request.query_params.get('month', timezone.now().date().replace(day=1).strftime('%Y-%m-%d'))
        try:
            # Expect 'YYYY-MM-DD' format by default
            month = datetime.strptime(month_str, '%Y-%m-%d').date().replace(day=1)
        except ValueError:
            return Response({'detail': 'Invalid month format.'}, status=status.HTTP_400_BAD_REQUEST)

        budget = MonthlyBudget.objects.filter(user=user, month__year=month.year, month__month=month.month).first()

        if budget:
            data = {
                'budget_amount': str(budget.budget_amount),
                'expenditure': str(budget.get_expenditure()),
                'is_over_budget': budget.is_over_budget()
            }
            return Response(data, status=status.HTTP_200_OK)
        return Response({'detail': 'Budget not found.'}, status=status.HTTP_404_NOT_FOUND)
  

class SavingsGoalViewSet(viewsets.ModelViewSet):
    """Savings goal view."""
    queryset = SavingsGoal.objects.all()  # Update the queryset to include all SavingsGoal objects
    serializer_class = SavingsGoalSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        """Filter savings goals by the current user."""
        user = self.request.user
        if user.is_authenticated:
            return SavingsGoal.objects.filter(user=user)
        return SavingsGoal.objects.none()

    def perform_create(self, serializer):
        """Create or update the savings goal."""
        user = self.request.user
        goal_amount = serializer.validated_data['goal_amount']
        goal_date = serializer.validated_data['goal_date']

        try:
            # Check if the user already has an active SavingsGoal
            savings_goal = user.savingsgoal
            # Update the existing goal
            savings_goal.goal_amount = goal_amount
            savings_goal.goal_date = goal_date
            savings_goal.remaining_amount = goal_amount - savings_goal.current_savings
            savings_goal.save()
        except SavingsGoal.DoesNotExist:
            # Create a new SavingsGoal if it doesn't exist
            savings_goal = SavingsGoal.objects.create(
                user=user,
                goal_amount=goal_amount,
                goal_date=goal_date,
                remaining_amount=goal_amount  # Assuming no savings initially
            )

        # Return the saved goal instance through the serializer
        return savings_goal

    @action(detail=False, methods=['post'])
    def add_amount(self, request):
        """Update the savings goal amount with the current date."""
        goal_amount = request.data.get('goal_amount', None)

        if goal_amount is None:
            return Response({'detail': 'Goal amount not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            goal_amount = Decimal(goal_amount)
        except (ValueError, TypeError):
            return Response({'detail': 'Invalid goal amount format.'}, status=status.HTTP_400_BAD_REQUEST)

        if goal_amount <= 0:
            return Response({'detail': 'Goal amount must be greater than zero.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the current date
        goal_date = timezone.now().date()

        try:
            goal = self.get_queryset().get()
        except SavingsGoal.DoesNotExist:
            return Response({'detail': 'Savings goal not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Update the goal_amount and set the goal_date to the current date
        goal.goal_amount = goal_amount
        goal.goal_date = goal_date
        goal.save()

        serializer = self.get_serializer(goal)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_savings(self, request):
        """Add savings amount to the savings goal."""
        user = request.user
        goal = get_object_or_404(SavingsGoal, user=user)

        if goal.is_goal_reached():
            return Response({'detail': 'Goal has already been reached.'}, status=status.HTTP_400_BAD_REQUEST)

        savings_amount = request.data.get('savings_amount', None)

        if savings_amount is None:
            return Response({'detail': 'Savings amount not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            savings_amount = Decimal(savings_amount)
        except (ValueError, TypeError):
            return Response({'detail': 'Invalid savings amount format.'}, status=status.HTTP_400_BAD_REQUEST)

        if savings_amount <= 0:
            return Response({'detail': 'Savings amount must be greater than zero.'}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate remaining amount to reach the goal
        remaining_amount = goal.get_remaining_amount()

        # if savings_amount > remaining_amount:
        #     return Response({'detail': 'Savings amount exceeds the remaining amount.'}, status=status.HTTP_400_BAD_REQUEST)

        # Add savings amount to current savings
        goal.current_savings += savings_amount
        goal.save()

        if goal.is_goal_reached():
            return Response({'detail': 'Congratulations! Goal reached and exceeded!'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Savings added successfully.'}, status=status.HTTP_200_OK)


    @action(detail=False, methods=['get'])
    def check_goal_status(self, request):
        """Check the status of the savings goal."""
        goal = get_object_or_404(SavingsGoal, user=request.user)
        data = {
            'goal_amount': str(goal.goal_amount),
            'current_savings': str(goal.current_savings),
            'goal_date': goal.goal_date,
            'is_goal_reached': goal.is_goal_reached(),
            'remaining_amount': str(goal.get_remaining_amount()),
        }
        return Response(data, status=status.HTTP_200_OK)

class SubscriptionViewSet(viewsets.ModelViewSet):
    """Subscription view."""
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        """Filter subscriptions by the current user and optionally by month and year."""
        queryset = Subscription.objects.filter(user=self.request.user)

        # Get the month and year from query parameters
        month = self.request.query_params.get('month')
        year = self.request.query_params.get('year')

        if month and year:
            try:
                # Convert month and year to integers
                month = int(month)
                year = int(year)

                # Filter the subscriptions based on month and year
                queryset = queryset.filter(due_date__month=month, due_date__year=year)
            except ValueError:
                # Handle the case where month or year is not a valid integer
                queryset = Subscription.objects.none()
                
        return queryset

    def perform_create(self, serializer):
        """Set the user field and default values."""
        serializer.save(user=self.request.user, is_paid=False)

    @action(detail=True, methods=['post'])
    def mark_as_paid(self, request, pk=None):
        """Toggle the subscription's paid status."""
        subscription = self.get_object()
        if subscription.user != request.user:
            return Response({"detail": "Not authorized"}, status=403)

        # Toggle the `is_paid` status
        subscription.is_paid = not subscription.is_paid
        subscription.save()

        status = "paid" if subscription.is_paid else "unpaid"
        return Response({"status": f"Subscription marked as {status}"})


class InsightViewSet(viewsets.ModelViewSet):
    """Insights view."""
    queryset = Insight.objects.all().order_by('-date_posted')
    serializer_class = InsightSerializer
