"""Module for serializing the models of the core app."""
from rest_framework import serializers
from .models import ( Transaction, Category, User, SubCategory )
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class RegisterSerializer(serializers.ModelSerializer):
    """User registration serializer."""
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        """Meta class."""
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, data):
        """Check that the passwords match."""
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data):
        """Create the user."""
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        Token.objects.create(user=user)  # Create an authentication token
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
        
        # Generate or get token for the authenticated user
        token, _ = Token.objects.get_or_create(user=user)
        
        return {'user': user, 'token': token.key}


class SubCategorySerializer(serializers.ModelSerializer):
    """Subcategory serializer."""
    class Meta:
        model = SubCategory
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    """Category serializer."""
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    """User serializer."""
    profile = serializers.StringRelatedField() 

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile')  

class TransactionSerializer(serializers.ModelSerializer):
    """Transaction serializer."""
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    subcategory = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all())
    user = serializers.ReadOnlyField(source='user.username')  # Read-only field for display purposes

    class Meta:
        model = Transaction
        fields = ['id', 'category', 'subcategory', 'amount', 'date', 'description', 'user']
        read_only_fields = ['user', 'date']  # Exclude from input