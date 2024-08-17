"""Tests for the transactions endpoint"""
import json
from django.test import TestCase, Client
from django.urls import reverse
from core.models import Transaction
from core.serializers import TransactionSerializer

class TransactionsViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_transactions(self):
        response = self.client.get('/transactions')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Get all transactions'})

    def test_get_transaction_by_id(self):
        response = self.client.get('/transactions/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Get transaction with id 1'})

    def test_create_transaction(self):
        data = {'amount': 100, 'description': 'Test transaction'}        
        response = self.client.post('/transactions', json=json.dumps(data))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json, {'message': 'Transaction created successfully'})

    def test_update_transaction(self):
        data = {'amount': 200, 'description': 'Updated transaction'}
        response = self.client.put('/transactions/1', json=json.dumps(data))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Transaction updated successfully'})

    def test_delete_transaction(self):
        response = self.client.delete('/transactions/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Transaction deleted successfully'})

if __name__ == '__main__':
    class TransactionsViewSetTests(TestCase):
        def setUp(self):
            self.client = Client()
            self.transactions_url = reverse('transactions-list')
            self.transaction = Transaction.objects.create(amount=100, description='Test transaction')

        def test_get_all_transactions(self):
            response = self.client.get(self.transactions_url)
            transactions = Transaction.objects.all()
            serializer = TransactionSerializer(transactions, many=True)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.content, serializer.data)

        def test_get_transaction_by_id(self):
            transaction_url = reverse('transactions-detail', args=[self.transaction.id])
            response = self.client.get(transaction_url)
            serializer = TransactionSerializer(self.transaction)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.content, serializer.data)

        def test_create_transaction(self):
            data = {'amount': 200, 'description': 'New transaction'}
            response = self.client.post(self.transactions_url, data=json.dumps(data), content_type='application/json')
            self.assertEqual(response.status_code, 201)
            self.assertEqual(response.content, {'message': 'Transaction created successfully'})

        def test_update_transaction(self):
            transaction_url = reverse('transactions-detail', args=[self.transaction.id])
            data = {'amount': 300, 'description': 'Updated transaction'}
            response = self.client.put(transaction_url, data=json.dumps(data), content_type='application/json')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.content, {'message': 'Transaction updated successfully'})

        def test_delete_transaction(self):
            transaction_url = reverse('transactions-detail', args=[self.transaction.id])
            response = self.client.delete(transaction_url)
            self.assertEqual(response.status_code, 204)
            self.assertEqual(response.content, None)
