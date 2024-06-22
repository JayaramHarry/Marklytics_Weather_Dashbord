// Import necessary libraries and components from React and Chart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "./BarChart.css"

// Register Chart.js components
Chart.register(...registerables);

// Define the BarChart component
const BarChart = ({ weatherData, selectedDate }) => {
  // State to store the chart data
  const [chartData, setChartData] = useState(null);

  // Function to aggregate weather data by the selected date
  const aggregateDataByDate = (data) => {
    // Filter data for the selected date
    const dateData = data.filter(item => item.dt_txt.startsWith(selectedDate));
    
    // Aggregate the data by summing up the relevant fields and counting the entries
    const aggregatedData = dateData.reduce((acc, item) => {
      acc.temp += item.main.temp;
      acc.feels_like += item.main.feels_like;
      acc.temp_max += item.main.temp_max;
      acc.temp_min += item.main.temp_min;
      acc.humidity += item.main.humidity;
      acc.count += 1;

      return acc;
    }, { temp: 0, feels_like: 0, temp_max: 0, temp_min: 0, humidity: 0, count: 0 });

    // Calculate the average for each field
    return {
      temp: aggregatedData.temp / aggregatedData.count,
      feels_like: aggregatedData.feels_like / aggregatedData.count,
      temp_max: aggregatedData.temp_max / aggregatedData.count,
      temp_min: aggregatedData.temp_min / aggregatedData.count,
      humidity: aggregatedData.humidity / aggregatedData.count,
    };
  };

  // useEffect hook to update the chart data when weatherData or selectedDate changes
  useEffect(() => {
    if (weatherData && selectedDate) {
      // Aggregate the data for the selected date
      const data = aggregateDataByDate(weatherData.list);
      
      // Set the chart data with the aggregated values
      setChartData({
        labels: ['Current', 'Feels Like', 'Max Temp', 'Min Temp', 'Humidity'],
        datasets: [
          {
            label: `Temperature on ${selectedDate} (°C)`,
            data: [
              data.temp,
              data.feels_like,
              data.temp_max,
              data.temp_min,
              data.humidity,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [weatherData, selectedDate]); // Dependencies for useEffect: weatherData and selectedDate

  return (
    <div className='bar-chart-container'>
      <h2>Weather Data - Bar Chart</h2>
      {/* Display the city and country if weatherData is available */}
      {weatherData && <h3>{weatherData.city}, {weatherData.country}</h3>}
      {/* Render the bar chart if chartData is available, otherwise show a loading message */}
      {chartData ? <Bar className='bar-chart' data={chartData} /> : <p>Loading weather data...</p>}
    </div>
  );
};

export default BarChart;
