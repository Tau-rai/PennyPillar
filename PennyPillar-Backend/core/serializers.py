"""Module for serializing the models of the core app."""
from rest_framework import serializers
from .models import ( Transaction, Category, User, MonthlyBudget, SavingsGoal, Subscription, UserProfile, Insight )
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from PIL import Image
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime
from decimal import Decimal
import markdown2

class RegisterSerializer(serializers.ModelSerializer):
    """User registration serializer."""
    password2 = serializers.CharField(write_only=True)

    class Meta:
        """Meta class."""
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        """Check that the passwords match and the email is unique."""
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
        return data

    def create(self, validated_data):
        """Create the user."""
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    """User login serializer."""
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """Authenticate user and return token."""
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        
        # Generate JWT token for the authenticated user
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        
        return {'user': user, 'token': token}


class CategorySerializer(serializers.ModelSerializer):
    """Category serializer."""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Category
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    """User profile serializer"""
    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'image']
        read_only_fields = ['email', 'username']

    def create(self, validated_data):
        user = self.context['request'].user
        profile = UserProfile.objects.create(
            user=user,
            email=user.email,
            username=user.username,
            **validated_data
        )
        return profile

    def update(self, instance, validated_data):
        user = self.context['request'].user
        instance.email = user.email
        instance.username = user.username
        return super().update(instance, validated_data)



class TransactionSerializer(serializers.ModelSerializer):
    """Transaction serializer."""
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    user = serializers.ReadOnlyField(source='user.username')  # Read-only field for display purposes

    class Meta:
        model = Transaction
        fields = ['id', 'category', 'amount', 'date', 'description', 'user']
        read_only_fields = ['user', 'date']  # Exclude from input

class MonthlyBudgetSerializer(serializers.ModelSerializer):
    """Monthly budget serializer"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    month = serializers.DateField()
    get_expenditure = serializers.SerializerMethodField()
    is_over_budget = serializers.SerializerMethodField()
    get_remaining_budget = serializers.SerializerMethodField()

    class Meta:
        model = MonthlyBudget
        fields = ['id', 'user', 'month', 'budget_amount', 'get_expenditure', 'is_over_budget', 'get_remaining_budget']
        read_only_fields = ['user', 'get_expenditure', 'is_over_budget', 'get_remaining_budget']

    def get_get_expenditure(self, obj):
        return obj.get_expenditure()

    def get_is_over_budget(self, obj):
        return obj.is_over_budget()

    def get_get_remaining_budget(self, obj):
        return obj.get_remaining_budget()


class SavingsGoalSerializer(serializers.ModelSerializer):
    current_savings = serializers.ReadOnlyField()
    is_goal_reached = serializers.SerializerMethodField()
    remaining_amount = serializers.SerializerMethodField()

    class Meta:
        model = SavingsGoal
        fields = ['user', 'goal_amount', 'current_savings', 'goal_date', 'is_goal_reached', 'remaining_amount']
        read_only_fields = ['user', 'current_savings', 'is_goal_reached', 'remaining_amount']

    def get_is_goal_reached(self, obj):
        """Determine if the goal has been reached."""
        if isinstance(obj, dict):
            return obj.get('is_goal_reached', False)
        return obj.is_goal_reached()

    def get_remaining_amount(self, obj):
        """Calculate the remaining amount to reach the goal."""
        if isinstance(obj, dict):
            return obj.get('remaining_amount', 0)
        return str(obj.get_remaining_amount())
    
    def get_current_savings(self, obj):
        """Retrieve the current savings amount."""
        if isinstance(obj, dict):
            return obj.get('current_savings', 0)
        return str(obj.current_savings)

    def update(self, instance, validated_data):
        """Handle updates to the goal_amount."""
        goal_amount = validated_data.get('goal_amount', None)
        if goal_amount is not None:
            instance.goal_amount = goal_amount

        instance.save()
        return instance
    
    def create(self, validated_data):
        """Create a new savings goal."""
        user = self.context['request'].user
        goal_amount = validated_data.get('goal_amount', None)
        goal_date = validated_data.get('goal_date', None)
        
        # Ensure goal_amount is a Decimal
        goal_amount = Decimal(goal_amount)
        
        # Calculate the remaining amount to reach the goal
        remaining_amount = goal_amount - user.savingsgoal.current_savings
        
        # Check if the goal has already been reached
        is_goal_reached = remaining_amount <= 0
        
        # Create the savings goal
        savings_goal = SavingsGoal.objects.create(
            user=user,
            goal_amount=goal_amount,
            goal_date=goal_date
        )
        
        return savings_goal

class SubscriptionSerializer(serializers.ModelSerializer):
    """Subscription serializer."""
    # user = serializers.ReadOnlyField(source='user.username')  # Read-only field for display purposes

    class Meta:
        model = Subscription
        fields = ['id', 'name', 'amount', 'frequency', 'payment_method', 'due_date', 'is_paid']
        read_only_fields = ['id', 'user']


class InsightSerializer(serializers.ModelSerializer):
    """Insights serializer with Markdown to HTML conversion."""
    
    # Add a field for the formatted HTML content
    formatted_content = serializers.SerializerMethodField()

    class Meta:
        model = Insight
        fields = ['title', 'content', 'formatted_content', 'date_posted']

    def get_formatted_content(self, obj):
        """Convert Markdown content to HTML."""
        return markdown2.markdown(obj.content)
