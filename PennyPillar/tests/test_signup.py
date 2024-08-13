from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User

class RegisterViewTests(APITestCase):
    def test_register_user(self):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'password': 'testpassword',
            'password2': 'testpassword', 
            'email': 'test@example.com'
        }
        response = self.client.post(url, data, format='json')
        print(response.data)  
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['username'], 'testuser')
        self.assertTrue('token' in response.data)

    def test_register_user_existing_email(self):
        User.objects.create_user(username='existinguser', password='password', email='test@example.com')
        url = reverse('register')
        data = {
            'username': 'newuser',
            'password': 'newpassword',
            'password2': 'newpassword',  
            'email': 'test@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_existing_username(self):
        User.objects.create_user(username='testuser', password='password', email='existing@example.com')
        url = reverse('register')
        data = {
            'username': 'testuser',
            'password': 'newpassword',
            'password2': 'newpassword', 
            'email': 'new@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_invalid_data(self):
        url = reverse('register')
        data = {
            'username': '',
            'password': 'password',
            'password2': 'password', 
            'email': 'invalidemail'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('email' in response.data)