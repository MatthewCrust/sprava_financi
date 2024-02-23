import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useAccountBalance } from './AccountBalanceContext';
import './Graph.css';
function Graph() {
    const { accountBalance } = useAccountBalance();
    const [chart, setChart] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        let newChart = null;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('accountBalanceChart').getContext('2d');
        newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Stav účtu',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

        setChart(newChart);
        chartRef.current = newChart;

        return () => {
            if (newChart) {
                newChart.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (chart) {
            chart.data.labels.push(chart.data.labels.length + 1);
            chart.data.datasets[0].data.push(accountBalance);
            chart.update();
        }
    }, [accountBalance, chart]);

    return (
        <div className='graph-box'>
            <canvas id="accountBalanceChart"></canvas>
        </div>
    );
}

export default Graph;
