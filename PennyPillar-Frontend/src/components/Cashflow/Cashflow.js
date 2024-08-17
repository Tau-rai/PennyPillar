import React, { useState } from 'react';
import './Cashflow.css';

const Cashflow = () => {
  const [rows, setRows] = useState({
    income: [{ description: '', amount: 0 }],
    savings: [{ description: '', amount: 0 }],
    expenses: [{ description: '', category: 'Rent', amount: 0 }],
  });

  const addRow = (category) => {
    setRows({
      ...rows,
      [category]: [
        ...rows[category],
        category === 'expenses'
          ? { description: '', category: 'Rent', amount: 0 }
          : { description: '', amount: 0 },
      ],
    });
  };

  const handleInputChange = (category, index, field, value) => {
    const updatedCategory = rows[category].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );

    setRows({ ...rows, [category]: updatedCategory });
  };

  const calculateTotal = (category) => {
    return rows[category].reduce((total, item) => total + parseFloat(item.amount || 0), 0);
  };

  const totalIncome = calculateTotal('income');
  const totalSavings = calculateTotal('savings');
  const totalExpenses = calculateTotal('expenses');
  const netTotal = totalIncome - totalSavings - totalExpenses;

  return (
    <div className="container">
      <h2>Say Goodbye to Accounting Stress—Effortlessly Manage Your Finances with Our Smart Sheet!</h2>

      <table className="table">
        <tbody>
          <tr className="empty-row">
            <th className="description-column">
              Income
              <span className="add-btn" onClick={() => addRow('income')}>+</span>
            </th>
            <td className="category-column"></td>
            <td className="amount-column"></td>
          </tr>
          {rows.income.map((item, index) => (
            <tr key={index} className="category-row">
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange('income', index, 'description', e.target.value)
                  }
                />
              </td>
              <td className="category-column"></td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) =>
                    handleInputChange('income', index, 'amount', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}

          <tr className="empty-row">
            <th className="description-column">
              Savings
              <span className="add-btn" onClick={() => addRow('savings')}>+</span>
            </th>
            <td className="category-column"></td>
            <td className="amount-column"></td>
          </tr>
          {rows.savings.map((item, index) => (
            <tr key={index} className="category-row">
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange('savings', index, 'description', e.target.value)
                  }
                />
              </td>
              <td className="category-column"></td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) =>
                    handleInputChange('savings', index, 'amount', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}

          <tr className="empty-row">
            <th className="description-column">
              Expenses
              <span className="add-btn" onClick={() => addRow('expenses')}>+</span>
            </th>
            <td className="category-column"></td>
            <td className="amount-column"></td>
          </tr>
          {rows.expenses.map((item, index) => (
            <tr key={index} className="category-row">
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange('expenses', index, 'description', e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  className="form-select"
                  value={item.category}
                  onChange={(e) =>
                    handleInputChange('expenses', index, 'category', e.target.value)
                  }
                >
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) =>
                    handleInputChange('expenses', index, 'amount', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="total-row">Total Income:</td>
            <td colSpan="2" className="amount-column">${totalIncome.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="total-row">Total Savings:</td>
            <td colSpan="2" className="amount-column">${totalSavings.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="total-row">Total Expenses:</td>
            <td colSpan="2" className="amount-column">${totalExpenses.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="total-row">Net Total:</td>
            <td colSpan="2" className="amount-column">${netTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cashflow;

