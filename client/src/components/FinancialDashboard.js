import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const FinancialDashboard = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from backend (example: fetching transaction amounts over time)
    axios.get('/api/transactions')
      .then(response => {
        const transactionData = response.data;

        // Process data to format for Chart.js
        const labels = transactionData.map(transaction => transaction.date);
        const amounts = transactionData.map(transaction => transaction.amount);

        // Chart.js data structure
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Transaction Amounts',
              data: amounts,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Financial Trends</h2>
      <Line data={chartData} />
    </div>
  );
};

export default FinancialDashboard;
