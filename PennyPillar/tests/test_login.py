from rest_framework import status
from rest_framework.test import APITestCase

class LoginViewTests(APITestCase):
    def test_login_success(self):
        # Assuming a user registration endpoint exists
        self.client.post('/register/', {'username': 'testuser', 'password': 'password123', 'password2': 'password123'})
        
        response = self.client.post('/login/', {'username': 'testuser', 'password': 'password123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
    
    def test_login_invalid_credentials(self):
        response = self.client.post('/login/', {'username': 'testuser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_login_missing_credentials(self):
        response = self.client.post('/login/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
