import React, { useState, useEffect, useRef } from 'react';
import './Budget.css';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axiosInstance from '../../axiosConfig';
import MainFooter from '../ComponentFooter';
import Header from '../Header';

Chart.register(...registerables, ChartDataLabels);

const Budget = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [budgetStatus, setBudgetStatus] = useState(null); // Stores budget status from the API
    const [budgetAmount, setBudgetAmount] = useState(''); // Stores the input for setting a budget
    const expenseChartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        fetchBudgetStatus(); // Fetch the budget status when month or year changes
    }, [month, year]);

    useEffect(() => {
        if (expenseChartRef.current && budgetStatus) {
            initializeCharts(); // Initialize the chart only if the canvas element is available and budgetStatus is loaded
        }
    }, [budgetStatus]); // Re-run when budgetStatus changes

    const fetchBudgetStatus = async () => {
        try {
            const monthStr = `${year}-${String(month + 1).padStart(2, '0')}-01`; // Format month as 'YYYY-MM-DD'
            const response = await axiosInstance.get('/monthly-budget/check_budget_status/', {
                params: { month: monthStr },
            });
            setBudgetStatus(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setBudgetStatus(null); // No budget found
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
            fetchBudgetStatus(); // Refresh the budget status after setting it
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

    const initializeCharts = () => {
        const ctx = expenseChartRef.current.getContext('2d');
        const expenseData = getExpenseData();
        const total = Object.values(expenseData).reduce((a, b) => a + b, 0); // Calculate total for percentage

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // Destroy the previous chart instance if it exists
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(expenseData),
                datasets: [
                    {
                        data: Object.values(expenseData),
                        backgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }, // Hide legend
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const value = tooltipItem.raw;
                                return `${tooltipItem.label}: $${value}`;
                            },
                        },
                    },
                    datalabels: {
                        display: true,
                        color: '#fff',
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => {
                            const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
                            return `${percentage}%`;
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount ($)',
                        },
                    },
                },
            },
        });
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
                        </div>
                    </section>

                    <section id="budget" className="section">
                        <h2>Budget Status</h2>
                        {budgetStatus ? (
                            <div className="budget-details">
                                <p>Budget Amount: ${budgetStatus.budget_amount}</p>
                                <p>Expenditure: ${budgetStatus.expenditure}</p>
                                <p>Status: {budgetStatus.is_over_budget ? 'Over Budget' : 'Within Budget'}</p>
                                <canvas ref={expenseChartRef} id="expenseChart"></canvas>
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
