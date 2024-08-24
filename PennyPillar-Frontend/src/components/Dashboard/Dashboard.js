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
    const cashFlowChartRef = useRef(null);
    const netIncomeRef = useRef(null);
    const challengeChartRef = useRef(null);
    const expenseChartRef = useRef(null); // Reference for expenseChart

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

    const renderCalendar = () => {
        const calendarDays = document.getElementById('calendar-days');
        if (calendarDays) {
            calendarDays.innerHTML = '';

            const firstDay = new Date(year, month - 1, 1).getDay();
            const lastDate = new Date(year, month, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
                const blankDay = document.createElement('div');
                blankDay.className = 'calendar-day blank-day';
                calendarDays.appendChild(blankDay);
            }

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
        [budgetChartRef, cashFlowChartRef, netIncomeRef, challengeChartRef, expenseChartRef].forEach(chartRef => {
            if (chartRef.current && chartRef.current.chartInstance) {
                chartRef.current.chartInstance.destroy();
            }
        });
    };

    const initializeCharts = () => {
        destroyCharts();

        // Initialize Budget Chart
        if (budgetChartRef.current) {
            budgetChartRef.current.chartInstance = new Chart(budgetChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Total Budget', 'Spent', 'Remaining'],
                    datasets: [{
                        label: 'Budget Overview',
                        data: [
                            budgetData.totalBudget, 
                            budgetData.expenditure, 
                            budgetData.remainingBudget
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

        // Initialize Cash Flow Chart
        if (cashFlowChartRef.current) {
            cashFlowChartRef.current.chartInstance = new Chart(cashFlowChartRef.current, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        label: 'Cash Flow',
                        data: [500, 700, 600, 800], // Placeholder values
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
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

        // Initialize Penny Challenge Chart
        if (challengeChartRef.current) {
            challengeChartRef.current.chartInstance = new Chart(challengeChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Challenge', 'Remaining'],
                    datasets: [{
                        label: 'Challenge Status',
                        data: [500, 1500], // Placeholder values
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)'
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

        // Initialize Expense Chart
        if (expenseChartRef.current) {
            expenseChartRef.current.chartInstance = new Chart(expenseChartRef.current, {
                type: 'bar',
                data: {
                    labels: expenseLabels,
                    datasets: [{
                        label: 'Expenses',
                        data: expenseValues,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
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
                    },
                    scales: {
                        x: {
                            stacked: true,
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            stacked: true,
                            grid: {
                                display: true
                            },
                            ticks: {
                                callback: function (value) {
                                    return '$' + value;
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    return (
        <div className="dashboard-container">
            <Header />
            <div className="calendar-controls">
                <button onClick={() => changeMonth(-1)}>Previous</button>
                <span>{`Month: ${month}/${year}`}</span>
                <button onClick={() => changeMonth(1)}>Next</button>
            </div>
            <div className="calendar-container">
                <div className="calendar-days" id="calendar-days">
                    {/* Days will be dynamically rendered here */}
                </div>
            </div>
            <div className="charts-container">
                <div className="chart">
                    <canvas ref={budgetChartRef} />
                </div>
                <div className="chart">
                    <canvas ref={cashFlowChartRef} />
                </div>
                <div className="chart">
                    <canvas ref={netIncomeRef} />
                </div>
                <div className="chart">
                    <canvas ref={challengeChartRef} />
                </div>
                <div className="chart">
                    <canvas ref={expenseChartRef} />
                </div>
            </div>
            <MainFooter />
        </div>
    );
    
};

export default Dashboard;
