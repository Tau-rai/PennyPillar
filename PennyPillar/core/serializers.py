"""Module for serializing the models of the core app."""
from rest_framework import serializers
from .models import ( Transaction, Category, User, MonthlyBudget, SavingsGoal)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from PIL import Image
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime


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
    """User profile serializer."""
    image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'image']
        read_only_fields = ['username']   

    def validate_image(self, value):
        """Validate the uploaded image."""
        if value:
            try:
                image = Image.open(value)
                # Additional validation logic for the image can be added here
            except:
                raise serializers.ValidationError("Invalid image file")
        return value

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

    class Meta:
        model = MonthlyBudget
        fields = ['id', 'user', 'month', 'budget_amount', 'get_expenditure', 'is_over_budget']
        read_only_fields = ['user', 'month', 'get_expenditure', 'is_over_budget']


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
        return obj.is_goal_reached()

    def get_remaining_amount(self, obj):
        """Calculate the remaining amount to reach the goal."""
        return obj.get_remaining_amount()

    def update(self, instance, validated_data):
        """Handle updates to the goal_amount."""
        goal_amount = validated_data.get('goal_amount', None)
        if goal_amount is not None:
            instance.goal_amount = goal_amount

        instance.save()
        return instance