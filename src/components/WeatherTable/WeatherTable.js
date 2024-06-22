// Importing React library
import React from 'react';
// Importing the CSS file for styling
import './WeatherTable.css';

// Define the WeatherTable component
const WeatherTable = ({ weatherData }) => {
  // Function to aggregate weather data by date
  const aggregateDataByDate = (data) => {
    // Reduce the data array to an object with dates as keys
    const aggregatedData = data.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0]; // Extract the date part of the datetime string
      // Initialize the object for the date if it doesn't exist
      if (!acc[date]) {
        acc[date] = {
          date,
          temp: 0,
          feels_like: 0,
          temp_max: 0,
          temp_min: 0,
          humidity: 0,
          count: 0,
        };
      }

      // Accumulate the weather data for the date
      acc[date].temp += item.main.temp;
      acc[date].feels_like += item.main.feels_like;
      acc[date].temp_max += item.main.temp_max;
      acc[date].temp_min += item.main.temp_min;
      acc[date].humidity += item.main.humidity;
      acc[date].count += 1;

      return acc;
    }, {});

    // Convert the accumulated data object to an array and calculate the averages
    return Object.values(aggregatedData).map((item) => ({
      date: item.date,
      temp: item.temp / item.count,
      feels_like: item.feels_like / item.count,
      temp_max: item.temp_max / item.count,
      temp_min: item.temp_min / item.count,
      humidity: item.humidity / item.count,
    }));
  };

  // Aggregate the weather data by date if available
  const aggregatedData = weatherData ? aggregateDataByDate(weatherData.list) : [];

  return (
    <div className="table-container">
      {/* Display the table title and location if weather data is available */}
      <h2>Weather Data - Table</h2>
      {weatherData && <h3>{weatherData.city}, {weatherData.country}</h3>}
      <table>
        <thead>
          <tr className="table-header">
            <th className="table-header-cell">Date</th>
            <th className="table-header-cell">Current Temp (°C)</th>
            <th className="table-header-cell">Feels Like (°C)</th>
            <th className="table-header-cell">Max Temp (°C)</th>
            <th className="table-header-cell">Min Temp (°C)</th>
            <th className="table-header-cell">Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the aggregated data and display it in table rows */}
          {aggregatedData.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{item.date}</td>
              <td className="table-cell">{item.temp.toFixed(2)}</td>
              <td className="table-cell">{item.feels_like.toFixed(2)}</td>
              <td className="table-cell">{item.temp_max.toFixed(2)}</td>
              <td className="table-cell">{item.temp_min.toFixed(2)}</td>
              <td className="table-cell">{item.humidity.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export the WeatherTable component as the default export
export default WeatherTable;
