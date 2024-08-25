// src/components/Budget.js
import React, { useState, useEffect } from 'react';
import './Budget.css';
import axiosInstance from '../../axiosConfig';
import MainFooter from '../ComponentFooter';
import Header from '../Header';
import ExpenseChart from '../ExpenseChart'; 

const Budget = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [budgetStatus, setBudgetStatus] = useState(null);
    const [budgetAmount, setBudgetAmount] = useState('');

    useEffect(() => {
        fetchBudgetStatus();
    }, [month, year]);

    const fetchBudgetStatus = async () => {
        try {
            const monthStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
            const response = await axiosInstance.get('/monthly-budget/check_budget_status/', {
                params: { month: monthStr },
            });
            setBudgetStatus(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setBudgetStatus(null);
            } else {
                console.error('Failed to fetch budget status:', error);
            }
        }
    };

    const handleSetBudget = async () => {
        if (!budgetAmount) return;

        try {
            const monthStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
            await axiosInstance.post('/monthly-budget/', {
                month: monthStr,
                budget_amount: budgetAmount,
            });
            fetchBudgetStatus();
        } catch (error) {
            console.error('Failed to set budget:', error);
        }
    };

    const changeMonth = (direction) => {
        setMonth((prevMonth) => (prevMonth + direction + 12) % 12);
        if (direction === -1 && month === 0) {
            setYear((prevYear) => prevYear - 1);
        } else if (direction === 1 && month === 11) {
            setYear((prevYear) => prevYear + 1);
        }
    };

    const getExpenseData = () => {
        if (!budgetStatus) return {};
        return {
            'Budget Amount': parseFloat(budgetStatus.budget_amount),
            'Amount Spent': parseFloat(budgetStatus.expenditure),
            'Remaining Balance': parseFloat(budgetStatus.budget_amount) - parseFloat(budgetStatus.expenditure),
        };
    };

    return (
        <>
            <Header isLoggedIn={true} />
            <div className="budget-container">
                <main>
                    <section id="calendar" className="section">
                        <h2>Monthly Calendar</h2>
                        <div className="calendar-container">
                            <div className="calendar-header">
                                <button onClick={() => changeMonth(-1)}>&#8249;</button>
                                <span id="calendar-month">
                                    {`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}
                                </span>
                                <button onClick={() => changeMonth(1)}>&#8250;</button>
                                </div>
                        <div id="calendar-days" className="calendar-days"></div>
                    
                        </div>
                    </section>

                    <section id="budget" className="section">
                        <h2>Budget Status</h2>
                        {budgetStatus ? (
                            <div className="budget-details">
                                <p>Budget Amount: ${budgetStatus.budget_amount}</p>
                                <p>Expenditure: ${budgetStatus.expenditure}</p>
                                <p>Status: {budgetStatus.is_over_budget ? 'Over Budget' : 'Within Budget'}</p>
                                <ExpenseChart data={getExpenseData()} /> {/* Use the new chart component */}
                            </div>
                        ) : (
                            <div className="set-budget">
                                <p>No budget set for this month.</p>
                                <div className="input-group">
                                    <label htmlFor="budget-amount">Set Budget Amount:</label>
                                    <input
                                        type="number"
                                        id="budget-amount"
                                        value={budgetAmount}
                                        onChange={(e) => setBudgetAmount(e.target.value)}
                                        placeholder="Enter amount"
                                    />
                                </div>
                                <button onClick={handleSetBudget}>Set Budget</button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
            <MainFooter />
        </>
    );
};

export default Budget;