import React, { useState, useEffect, useRef } from 'react';
import './Budget.css';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Budget = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [expenses, setExpenses] = useState([]);
    const [goals, setGoals] = useState([]);
    const [goalProgress, setGoalProgress] = useState(0);

    const expenseChartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        renderCalendar();
        initializeCharts();
    }, [month, year, expenses]);

    const renderCalendar = () => {
        const calendarDays = document.getElementById('calendar-days');
        calendarDays.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const blankDay = document.createElement('div');
            blankDay.className = 'calendar-day';
            calendarDays.appendChild(blankDay);
        }

        for (let i = 1; i <= lastDate; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = i;
            calendarDays.appendChild(day);
        }
    };

    const changeMonth = (direction) => {
        setMonth(prevMonth => (prevMonth + direction + 12) % 12);
        if (direction === -1 && month === 0) {
            setYear(prevYear => prevYear - 1);
        } else if (direction === 1 && month === 11) {
            setYear(prevYear => prevYear + 1);
        }
    };

    const initializeCharts = () => {
        const ctx = expenseChartRef.current.getContext('2d');
        const expenseData = getExpenseData();

        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(expenseData),
                datasets: [{
                    data: Object.values(expenseData),
                    backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: $${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });
    };

    const getExpenseData = () => {
        const expenseData = {};
        expenses.forEach(expense => {
            if (!expenseData[expense.name]) {
                expenseData[expense.name] = 0;
            }
            expenseData[expense.name] += expense.amount;
        });
        return expenseData;
    };

    const addExpense = () => {
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        if (name && !isNaN(amount)) {
            setExpenses([...expenses, { name, amount }]);
            document.getElementById('expense-name').value = '';
            document.getElementById('expense-amount').value = '';
        }
    };

    const addGoal = () => {
        const name = document.getElementById('goal-name').value;
        const target = parseFloat(document.getElementById('goal-target').value);
        if (name && !isNaN(target)) {
            setGoals([...goals, { name, target }]);
            setGoalProgress(calculateGoalProgress());
            document.getElementById('goal-name').value = '';
            document.getElementById('goal-target').value = '';
        }
    };

    const calculateGoalProgress = () => {
        // Simple example to calculate progress. Update with your logic.
        if (goals.length === 0) return 0;
        const total = goals.reduce((sum, goal) => sum + goal.target, 0);
        const progress = goals.reduce((sum, goal) => sum + (goal.target * 0.5), 0); // Example: 50% completion
        return (progress / total) * 100;
    };

    return (
        <div className="budget-container">
            <header className="header">
                <div className="logo">Financial Dashboard</div>
                <div className="hamburger" onClick={() => document.querySelector('.header').classList.toggle('show-nav')}>
                    &#9776;
                </div>
                <nav className="nav-links">
                    <a href="#calendar">Calendar</a>
                    <a href="#expenses">Expenses</a>
                    <a href="#goals">Goals</a>
                </nav>
            </header>
            <main>
                <section id="calendar" className="section">
                    <h2>Monthly Calendar</h2>
                    <div className="calendar-container">
                        <div className="calendar-header">
                            <button onClick={() => changeMonth(-1)}>&#8249;</button>
                            <span id="calendar-month">{`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</span>
                            <button onClick={() => changeMonth(1)}>&#8250;</button>
                        </div>
                        <div className="calendar-days" id="calendar-days"></div>
                    </div>
                </section>
                <section id="expenses" className="section">
                    <h2>Expense Tracker</h2>
                    <div className="input-group">
                        <label htmlFor="expense-name">Expense Name:</label>
                        <input type="text" id="expense-name" placeholder="Enter expense name" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="expense-amount">Amount:</label>
                        <input type="number" id="expense-amount" placeholder="Enter amount" />
                    </div>
                    <div className="input-group">
                        <button onClick={addExpense}>Add Expense</button>
                    </div>
                    <div className="expense-summary">
                        <h3>Expense Summary</h3>
                        <canvas ref={expenseChartRef} id="expenseChart"></canvas>
                    </div>
                </section>
                <section id="goals" className="section">
                    <h2>Financial Goals</h2>
                    <div className="input-group">
                        <label htmlFor="goal-name">Goal Name:</label>
                        <input type="text" id="goal-name" placeholder="Enter goal name" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="goal-target">Target Amount:</label>
                        <input type="number" id="goal-target" placeholder="Enter target amount" />
                    </div>
                    <div className="input-group">
                        <button onClick={addGoal}>Add Goal</button>
                    </div>
                    <div className="goal-summary">
                        <h3>Goal Progress</h3>
                        <div className="goal-progress">
                            <div className="goal-progress-bar" style={{ width: `${goalProgress}%` }}>
                                {goalProgress}%
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Budget;
