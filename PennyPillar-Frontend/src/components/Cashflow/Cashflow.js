import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import './Cashflow.css';
import { FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';
import MainFooter from '../ComponentFooter';
import Header from '../Header';

const Cashflow = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', category: '' });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

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
      const category = categories.find(cat => cat.name === selectedCategory);
      if (!category) {
        console.error('Category not found.');
        return;
      }

      const transactionToAdd = { 
        ...newTransaction, 
        category: category.id 
      };

      const response = await axiosInstance.post('/transactions/', transactionToAdd);
      setTransactions([...transactions, response.data]);
      setNewTransaction({ description: '', amount: '', category: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
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

  const handleAddIconClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowAddForm(!showAddForm); // Toggle the form visibility
  };

  const incomeTransactions = transactions.filter(t => getCategoryName(t.category) === 'Income');
  const expenseTransactions = transactions.filter(t => getCategoryName(t.category) === 'Expenses');
  const savingsTransactions = transactions.filter(t => getCategoryName(t.category) === 'Savings');
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);
  const totalSavings = savingsTransactions.reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);
  const netIncome = totalIncome - totalSavings - totalExpenses;

  return (
    <>
      <Header isLoggedIn={true} />
      <div className="cashflow-container">

        <div className="transaction-tables">
          {/* Income Category */}
          <div className="transaction-category">
            <div className="category-header">
              <h2>Income</h2>
              <FaPlus onClick={() => handleAddIconClick('Income')} className="icon-add" />
            </div>
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
                      <FaPencilAlt onClick={() => handleEditTransaction(transaction)} className="icon-pencil" />
                      <FaTrashAlt onClick={() => handleDeleteTransaction(transaction.id)} className="icon-bin" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Show Add Form Below the Income Table */}
            {showAddForm && selectedCategory === 'Income' && (
              <div className="add-transaction-form">
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
                  <button type="submit" className="btn-submit">Add Transaction</button>
                </form>
              </div>
            )}
          </div>

          {/* Expenses Category */}
          <div className="transaction-category">
            <div className="category-header">
              <h2>Expenses</h2>
              <FaPlus onClick={() => handleAddIconClick('Expenses')} className="icon-add" />
            </div>
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
                      <FaPencilAlt onClick={() => handleEditTransaction(transaction)} className="icon-pencil" />
                      <FaTrashAlt onClick={() => handleDeleteTransaction(transaction.id)} className="icon-bin" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Show Add Form Below the Expenses Table */}
            {showAddForm && selectedCategory === 'Expenses' && (
              <div className="add-transaction-form">
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
                  <button type="submit" className="btn-submit">Add Transaction</button>
                </form>
              </div>
            )}
          </div>

          {/* Savings Category */}
          <div className="transaction-category">
            <div className="category-header">
              <h2>Savings</h2>
              <FaPlus onClick={() => handleAddIconClick('Savings')} className="icon-add" />
            </div>
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
                      <FaPencilAlt onClick={() => handleEditTransaction(transaction)} className="icon-pencil" />
                      <FaTrashAlt onClick={() => handleDeleteTransaction(transaction.id)} className="icon-bin" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Show Add Form Below the Savings Table */}
            {showAddForm && selectedCategory === 'Savings' && (
              <div className="add-transaction-form">
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
                  <button type="submit" className="btn-submit">Add Transaction</button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Form for Editing Transactions */}
        {editingTransaction && (
          <div className="edit-transaction-form">
            <h3>Edit Transaction</h3>
            <form onSubmit={handleUpdateTransaction}>
              <input
                type="text"
                value={editingTransaction.description}
                onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
                placeholder="Description"
                className="form-input"
              />
              <input
                type="number"
                value={editingTransaction.amount}
                onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
                placeholder="Amount"
                className="form-input"
              />
              <button type="submit" className="btn-submit">Update Transaction</button>
            </form>
          </div>
        )}
         {/* Net Income Display */}
         <div className="net-income">
          <h3>Net Income: ${netIncome.toFixed(2)}</h3>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Cashflow;
