import React, { useState } from 'react';
import './Cashflow.css';
import { BsHandThumbsUp } from 'react-icons/bs';

const Cashflow = () => {
  const [rows, setRows] = useState({
    income: [{ description: '', amount: '' }],
    savings: [{ description: '', amount: '' }],
    expenses: [{ category: 'Rent', amount: '' }]
  });

  const addRow = (category) => {
    setRows(prevRows => ({
      ...prevRows,
      [category]: [...prevRows[category], category === 'expenses' ? { category: 'Rent', amount: '' } : { description: '', amount: '' }]
    }));
  };

  const handleInputChange = (category, index, field, value) => {
    const updatedRows = [...rows[category]];
    updatedRows[index][field] = value;
    setRows(prevRows => ({
      ...prevRows,
      [category]: updatedRows
    }));
  };

  const calculateTotals = () => {
    let totalIncome = 0;
    let totalSavings = 0;
    let totalExpenses = 0;

    rows.income.forEach(row => totalIncome += parseFloat(row.amount) || 0);
    rows.savings.forEach(row => totalSavings += parseFloat(row.amount) || 0);
    rows.expenses.forEach(row => totalExpenses += parseFloat(row.amount) || 0);

    return {
      totalIncome,
      totalSavings,
      totalExpenses,
      netTotal: totalIncome + totalSavings - totalExpenses
    };
  };

  const totals = calculateTotals();

  return (
    <div className="container">
      <h2>Say Goodbye to Accounting Stress—Effortlessly Manage Your Finances with Our Smart Sheet!</h2>
      <table id="income-statement">
        <tbody>
          {['income', 'savings', 'expenses'].map(category => (
            <React.Fragment key={category}>
              <tr className="empty-row">
                <th className="description-column">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="add-btn" onClick={() => addRow(category)}><BsHandThumbsUp /></span>
                </th>
                <td className="amount-column"></td>
              </tr>
              {rows[category].map((row, index) => (
                <tr key={index} className="category-row" data-category={category}>
                  <td>
                    {category === 'expenses' ? (
                      <select
                        className="form-select"
                        value={row.category}
                        onChange={e => handleInputChange(category, index, 'category', e.target.value)}
                      >
                        <option value="Rent">Rent</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={row.description}
                        onChange={e => handleInputChange(category, index, 'description', e.target.value)}
                      />
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      value={row.amount}
                      onChange={e => handleInputChange(category, index, 'amount', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="total-row">Total Income:</td>
            <td id="total-income" className="amount-column">${totals.totalIncome.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="total-row">Total Savings:</td>
            <td id="total-savings" className="amount-column">${totals.totalSavings.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="total-row">Total Expenses:</td>
            <td id="total-expenses" className="amount-column">${totals.totalExpenses.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="total-row">Net Total:</td>
            <td id="net-total" className="amount-column">${totals.netTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Cashflow;
