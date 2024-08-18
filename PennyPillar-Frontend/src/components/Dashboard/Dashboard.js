// Dashboard Component
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';

Chart.register(...registerables);

const Dashboard = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const budgetChartRef = useRef(null);
    const cashFlowChartRef = useRef(null);
    const recurringChartRef = useRef(null);
    const challengeChartRef = useRef(null);

    useEffect(() => {
        renderCalendar();
        initializeCharts();
    }, [month, year]);

    const renderCalendar = () => {
        const calendarDays = document.getElementById('calendar-days');
        if (calendarDays) {
            calendarDays.innerHTML = '';

            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();

            // Add blank days for the first week
            for (let i = 0; i < firstDay; i++) {
                const blankDay = document.createElement('div');
                blankDay.className = 'calendar-day blank-day';
                calendarDays.appendChild(blankDay);
            }

            // Add the actual days
            for (let i = 1; i <= lastDate; i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day';
                day.textContent = i;
                calendarDays.appendChild(day);
            }
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

    const destroyCharts = () => {
        if (budgetChartRef.current) {
            if (budgetChartRef.current.chartInstance) {
                budgetChartRef.current.chartInstance.destroy();
            }
        }
        if (cashFlowChartRef.current) {
            if (cashFlowChartRef.current.chartInstance) {
                cashFlowChartRef.current.chartInstance.destroy();
            }
        }
        if (recurringChartRef.current) {
            if (recurringChartRef.current.chartInstance) {
                recurringChartRef.current.chartInstance.destroy();
            }
        }
        if (challengeChartRef.current) {
            if (challengeChartRef.current.chartInstance) {
                challengeChartRef.current.chartInstance.destroy();
            }
        }
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
                        data: [1200, 400, 800], // Placeholder values
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)'
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

        // Initialize Recurring Payments Chart
        if (recurringChartRef.current) {
            recurringChartRef.current.chartInstance = new Chart(recurringChartRef.current, {
                type: 'pie',
                data: {
                    labels: ['Rent', 'Utilities', 'Subscriptions'],
                    datasets: [{
                        label: 'Recurring Payments',
                        data: [500, 200, 100], // Placeholder values
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
                type: 'line',
                data: {
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
                    datasets: [{
                        label: 'Penny Challenge Savings',
                        data: [0.01, 0.02, 0.04, 0.08], // Placeholder values
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 2
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
                                        label += '$' + context.parsed.y.toFixed(2);
                                    }
                                    return label;
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Days'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Amount Saved ($)'
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
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={() => changeMonth(-1)}>Prev</button>
                    <div>{`${month + 1}/${year}`}</div>
                    <button onClick={() => changeMonth(1)}>Next</button>
                </div>
                <div id="calendar-days" className="calendar-days"></div>
            </div>

            <div className="charts-section">
                <div className="chart-container" id="budget">
                    <div className="chart-header">Budget Overview</div>
                    <div className="chart-body">
                        <canvas id="budgetChart" ref={budgetChartRef}></canvas>
                        <div className="safe-to-spend-container">
                            <div className="safe-to-spend-label">Safe to Spend:</div>
                            <div className="safe-to-spend-amount">$200</div> {/* Placeholder value */}
                        </div>
                    </div>
                </div>

                <div className="chart-container" id="cash-flow">
                    <div className="chart-header">Cash Flow</div>
                    <div className="chart-body">
                        <canvas id="cashFlowChart" ref={cashFlowChartRef}></canvas>
                    </div>
                </div>

                <div className="chart-container" id="recurring">
                    <div className="chart-header">Recurring Payments</div>
                    <div className="chart-body">
                        <canvas id="recurringChart" ref={recurringChartRef}></canvas>
                    </div>
                </div>

                <div className="chart-container" id="challenge">
                    <div className="chart-header">Penny Challenge</div>
                    <div className="chart-body">
                        <canvas id="challengeChart" ref={challengeChartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
