// TemperatureChart.jsx
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureChart = ({ hourlyData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        const ctx = chartInstance.ctx;

        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.4)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

          chartInstance.data.datasets[0].backgroundColor = gradient;
          chartInstance.update();
        }
      }
    }
  }, [hourlyData]);

  const labels = hourlyData.map(hour => hour.time.split(' ')[1]); // Extract time
  const temperatures = hourlyData.map(hour => hour.temp_c); // Extract temperature in Celsius

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        fill: true,
        backgroundColor: 'rgba(253, 204, 41, 0.3)', // Background color with transparency
        borderColor: 'rgb(253, 204, 41)',
        tension: 0.4, // Rounded corners
        pointRadius: 0, // No point markers
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return `Temperature: ${tooltipItem.raw}°C`;
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;
