import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; // Import the custom axios instance
import './transactions.css'; // Import the CSS file for styling
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'; // Import icons

const Cashflow= () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', category: '' });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle add form visibility

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get('/transactions/');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchTransactions();
    fetchCategories();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/transactions/', newTransaction);
      setTransactions([...transactions, response.data]);
      setNewTransaction({ description: '', amount: '', category: '' });
      setShowAddForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleEditTransaction = async (id) => {
    try {
      const response = await axiosInstance.get(`/transactions/${id}/`);
      setEditingTransaction(response.data);
    } catch (error) {
      console.error('Error fetching transaction:', error);
    }
  };

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/transactions/${editingTransaction.id}/`, editingTransaction);
      setTransactions(transactions.map(t => t.id === editingTransaction.id ? response.data : t));
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axiosInstance.delete(`/transactions/${id}/`);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const getCategoryName = (id) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : 'Unknown';
  };

  // Calculate totals
  const incomeTransactions = transactions.filter(t => getCategoryName(t.category) === 'Income');
  const expenseTransactions = transactions.filter(t => getCategoryName(t.category) === 'Expenses');
  const savingsTransactions = transactions.filter(t => getCategoryName(t.category) === 'Savings');
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);
  const totalSavings = savingsTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const netIncome = totalIncome + totalSavings - totalExpenses;


  return (
    <div className="container">
     
      {showAddForm && (
        <form onSubmit={handleAddTransaction} className="transaction-form">
          <input
            type="text"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            placeholder="Description"
            className="form-input"
          />
          <input
            type="number"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            placeholder="Amount"
            className="form-input"
          />
          <select
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
            className="form-select"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button type="submit" className="btn-submit">Add Transaction</button>
        </form>
      )}

      <div className="transaction-tables">
        <div className="transaction-category">
          <h2>Income</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomeTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount}</td>
                  <td>
                    <FaPencilAlt onClick={() => handleEditTransaction(transaction.id)} className="icon-pencil" />
                    <FaTrashAlt onClick={() => handleDeleteTransaction(transaction.id)} className="icon-bin" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="transaction-category">
          <h2>Expenses</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>${Math.abs(transaction.amount)}</td>
                  <td>
                    <FaPencilAlt onClick={() => handleEditTransaction(transaction.id)} className="icon-pencil" />
                    <FaTrashAlt onClick={() => handleDeleteTransaction(transaction.id)} className="icon-bin" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="transaction-category">
          <h2>Savings</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savingsTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount}</td>
                  <td>
                    <FaPencilAlt onClick={() => handleEditTransaction(transaction.id)} className="icon-pencil" />
                    <FaTrashAlt onClick={() => handleDeleteTransaction(transaction.id)} className="icon-bin" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2>Net Income: ${(Number(netIncome)).toFixed(2)}</h2>

      {editingTransaction && (
        <div className="transaction-edit">
          <h2>Edit Transaction</h2>
          <form onSubmit={handleUpdateTransaction} className="transaction-form">
            <input
              type="text"
              value={editingTransaction.description}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
              className="form-input"
            />
            <input
              type="number"
              value={editingTransaction.amount}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
              className="form-input"
            />
            <select
              value={editingTransaction.category}
              onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
              className="form-select"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button type="submit" className="btn-submit">Update Transaction</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cashflow;
