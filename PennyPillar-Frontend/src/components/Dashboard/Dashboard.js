// Dashboard.js
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';
import Header from '../Header';
import axiosInstance from '../../axiosConfig';
import MainFooter from '../ComponentFooter';

Chart.register(...registerables);

const Dashboard = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [budgetData, setBudgetData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);

    const budgetChartRef = useRef(null);
    const netIncomeRef = useRef(null);
    const challengeChartRef = useRef(null);
    const expenseChartRef = useRef(null); 

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const response = await axiosInstance.get('/monthly-budgets/check_budget_status/', {
                    params: {
                        month,
                        year,
                    },
                });
                setBudgetData(response.data); 
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

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

        fetchBudgetData();
        fetchTransactions();
        fetchCategories();
    }, [month, year]);

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

    // Pie chart data and options
    const pieChartData = [
        { label: 'Income', value: totalIncome },
        { label: 'Expenses', value: totalExpenses },
        { label: 'Savings', value: totalSavings }
    ];

    // Prepare expense chart data
    const expenseLabels = expenseTransactions.map(t => t.description || 'No Description');
    const expenseValues = expenseTransactions.map(t => Math.abs(parseFloat(t.amount)));

    useEffect(() => {
        renderCalendar();
        initializeCharts();
    }, [month, year, budgetData, transactions, categories]);

    // Prepapre Penny Challenge data
    const [totalAmount, setTotalAmount] = useState(0);
    const [goalReached, setGoalReached] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);
    const [remainingAmount, setRemainingAmount] = useState(0);

    useEffect(() => {
        const fetchGoalStatus = async () => {
            try {
                const response = await axiosInstance.get('/savings-goal/check_goal_status/');
                const { goal_amount, current_savings, is_goal_reached, remaining_amount, goal_date } = response.data;
                setTotalAmount(parseFloat(current_savings));
                setGoalReached(is_goal_reached);
                setCurrentGoal({ goal_amount, goal_date });
                setRemainingAmount(parseFloat(remaining_amount));
            } catch (error) {
                console.error('Error fetching savings goal status:', error);
            }
        };

        fetchGoalStatus();
    }, []);

    // Prepare budget chart data
    const [budgetStatus, setBudgetStatus] = useState(null);

    useEffect(() => {
        fetchBudgetStatus();
    }, [month, year]);

    const fetchBudgetStatus = async () => {
        try {
            // const monthStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
            const response = await axiosInstance.get('/monthly-budget/check_budget_status/', {
                // params: { month: monthStr },
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

    const getExpenseData = () => {
        if (!budgetStatus) return {};

        const budgetAmount = parseFloat(budgetStatus.budget_amount) || 0;
        const amountSpent = parseFloat(budgetStatus.expenditure) || 0;
        const remainingBalance = budgetAmount - amountSpent

        return {
            'Budget Amount': budgetAmount,
            'Amount Spent': amountSpent,
            'Remaining Balance': remainingBalance,
        };
    };


    const renderCalendar = () => {
        const calendarDays = document.getElementById('calendar-days');
        if (calendarDays) {
            calendarDays.innerHTML = '';

            const firstDay = new Date(year, month - 1, 1).getDay();
            const lastDate = new Date(year, month, 0).getDate();

            // Create blank days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const blankDay = document.createElement('div');
                blankDay.className = 'calendar-day blank-day';
                calendarDays.appendChild(blankDay);
            }

            // Create days of the current month
            for (let i = 1; i <= lastDate; i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day';
                day.textContent = i;
                calendarDays.appendChild(day);
            }
        }
    };

    const changeMonth = (direction) => {
        setMonth((prevMonth) => {
            const newMonth = (prevMonth + direction + 12) % 12 || 12;
            if (direction === -1 && prevMonth === 1) {
                setYear((prevYear) => prevYear - 1);
            } else if (direction === 1 && prevMonth === 12) {
                setYear((prevYear) => prevYear + 1);
            }
            return newMonth;
        });
    };

    const destroyCharts = () => {
        [budgetChartRef, netIncomeRef, challengeChartRef, expenseChartRef].forEach(chartRef => {
            if (chartRef.current && chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }
        });
    };

    const initializeCharts = () => {
        destroyCharts();

        // Initialize Budget Chart
        if (budgetChartRef.current) {
            const data = getExpenseData();
            budgetChartRef.current.chartInstance = new Chart(budgetChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Total Budget', 'Spent', 'Remaining'],
                    datasets: [{
                        label: 'Budget Overview',
                        data: [
                            data['Budget Amount'], 
                            data['Amount Spent'],
                            data['Remaining Balance']
                        ],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) label += ': ';
                                    if (context.parsed.y !== null) label += '$' + context.parsed.y;
                                    return label;
                                },
                            },
                        },
                    },
                },
            });
        }

        // Initialize Net Income Chart
        if (netIncomeRef.current) {
            netIncomeRef.current.chartInstance = new Chart(netIncomeRef.current, {
                type: 'pie',
                data: {
                    labels: pieChartData.map(data => data.label),
                    datasets: [{
                        data: pieChartData.map(data => data.value),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
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
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += '$' + context.parsed;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }

        // // Initialize Penny Challenge Chart
        if (challengeChartRef.current) {
            challengeChartRef.current.chartInstance = new Chart(challengeChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Current Savings', 'Remaining Amount'],
                    datasets: [{
                        label: 'Penny Challenge',
                        data: [totalAmount, remainingAmount],
                        backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                            callbacks: {
                                label: context => `${context.dataset.label || ''}: $${context.parsed || 0}`
                            }
                        }
                    }
                }
            });
        }
    
        // Initialize Expense Chart
        if (expenseChartRef.current) {
            expenseChartRef.current.chartInstance = new Chart(expenseChartRef.current, {
                type: 'bar',
                data: {
                    labels: expenseLabels,
                    datasets: [{
                        label: 'Expenses',
                        data: expenseValues,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
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
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += '$' + context.parsed.y;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    return (
        <>
        <div className="dashboard-container">
            <Header isLoggedIn={true}/>
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={() => changeMonth(-1)}>&lt;</button>
                    <span>{`${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`}</span>
                    <button onClick={() => changeMonth(1)}>&gt;</button>
                </div>
                <div id="calendar-days" className="calendar-days"></div>
            </div>
            <div className="charts-container">
                <div className="chart">
                    <h2>Budget Overview</h2>
                    <canvas ref={budgetChartRef} />
                </div>
                <div className="chart">
                    <h2>Income Overview</h2>
                    <canvas ref={netIncomeRef} />
                </div>
                <div className="chart">
                    <h2>Penny Challenge</h2>
                    <canvas ref={challengeChartRef} />
                </div>
                <div className="chart">
                    <h2>Expense Chart</h2>
                    <canvas ref={expenseChartRef} />
                </div>
            </div>
            
        </div>
        <MainFooter />
        </>
    );
};

export default Dashboard;
