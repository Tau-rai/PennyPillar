"""Module for views of the core app."""
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .models import Transaction, Category, SubCategory
from .serializers import RegisterSerializer, LoginSerializer, TransactionSerializer, CategorySerializer, SubCategorySerializer
from rest_framework import generics, viewsets, permissions, status
from django_filters import rest_framework as django_filters


class RegisterView(generics.CreateAPIView):
    """Register view."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        """User registration."""
        user = serializer.save()
        password = self.request.data.get('password')
        
        # Set the password using Django's method to ensure it's hashed correctly
        user.set_password(password)
        user.save()

class LoginView(generics.GenericAPIView):
    """Login view."""
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """Login post method."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        
        # Extract the user and token from validated_data
        token = validated_data.get('token')
        
        return Response({'token': token}, status=status.HTTP_200_OK)
    

class TransactionViewSet(viewsets.ModelViewSet):
    """Transaction view."""
    queryset = Transaction.objects.none()  
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        """Filter transactions by the current user"""
        user = self.request.user
        return Transaction.objects.filter(user=user) 

    def perform_create(self, serializer):
        """Set the user field"""
        serializer.save(user=self.request.user) 

class CategoryViewSet(viewsets.ModelViewSet):
    """
    Category view

    Attributes:
        queryset (QuerySet): All instances of the Category model.
        serializer_class (Serializer): The serializer class used for Category model.
        permission_classes (list): The list of permission classes applied to the view.
        authentication_classes (list): The list of authentication classes applied to the view.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

class SubCategoryFilter(django_filters.FilterSet):
    """Subcategory filter."""
    category = django_filters.NumberFilter(field_name='category', lookup_expr='exact')

    class Meta:
        model = SubCategory
        fields = ['category']

class SubCategoryViewSet(viewsets.ModelViewSet):
    """Subcategory view."""
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    filter_backends = (django_filters.DjangoFilterBackend,)
    filterset_class = SubCategoryFilter
