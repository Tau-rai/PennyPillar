// Expenses chart component
// src/components/ExpenseChart.js
import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

const ExpenseChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && data) {
            initializeChart();
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    const initializeChart = () => {
        const ctx = chartRef.current.getContext('2d');
        const total = Object.values(data).reduce((a, b) => a + b, 0);

        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        data: Object.values(data),
                        backgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
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
                            const percentage = ((value / total) * 100).toFixed(2);
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

    return <canvas ref={chartRef}></canvas>;
};

export default ExpenseChart;
