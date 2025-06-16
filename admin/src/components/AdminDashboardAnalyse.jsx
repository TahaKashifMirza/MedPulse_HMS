import React, { useState, useEffect } from 'react';
import '../CSS/AdminDashboardAnalyse.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registering necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboardAnalyse = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Patient Data Analysis',
        data: [],
        borderColor: 'rgba(0,123,255,1)',
        backgroundColor: 'rgba(0,123,255,0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newLabel = new Date().toLocaleTimeString();
        const newData = Math.floor(Math.random() * 100);
        const updatedLabels = [...prevData.labels, newLabel];
        const updatedData = [...prevData.datasets[0].data, newData];

        if (updatedLabels.length > 10) {
          updatedLabels.shift();
          updatedData.shift();
        }

        return {
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hmsanalysis-dashboard">
      <h1 className="hmsanalysis-title">MedPulse - Data Analysis</h1>
      <h2 className="hmsanalysis-subtitle">Real-Time Patient Data Analysis</h2>
      <div className="hmsanalysis-chart-container">
        <Line data={data} options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: '#f0f0f0',
                borderColor: '#ddd',
              },
            },
            y: {
              grid: {
                color: '#f0f0f0',
                borderColor: '#ddd',
              },
              ticks: {
                color: '#555',
              },
            },
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.7)',
              titleColor: '#fff',
              bodyColor: '#fff',
              bodyFont: {
                size: 12,
              },
              footerColor: '#fff',
            },
            legend: {
              labels: {
                color: '#333',
              },
            },
          },
        }} />
      </div>
    </div>
  );
};

export default AdminDashboardAnalyse;
