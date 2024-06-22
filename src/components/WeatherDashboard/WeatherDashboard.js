// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import BarChart from '../BarChart/BarChart';
import WeatherTable from '../WeatherTable/WeatherTable';
import { fetchWeatherData } from '../../services/WeatherService';
import "./WeatherDashboard.css"

// Define the WeatherDashboard component
const WeatherDashboard = () => {
  // State variables to store weather data, selected city, and selected date
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedDate, setSelectedDate] = useState('');

  // List of cities to be displayed in the dropdown
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai'];

  // Fetch weather data whenever the selected city changes
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData(selectedCity);
      setWeatherData(data);
      if (data && data.list.length > 0) {
        // Set the selected date to the first available date in the data
        setSelectedDate(data.list[0].dt_txt.split(' ')[0]);
      }
    };

    fetchData();
  }, [selectedCity]);

  // Handle the city change event
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // Handle the date change event
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Extract unique available dates from the weather data
  const availableDates = weatherData
    ? Array.from(new Set(weatherData.list.map(item => item.dt_txt.split(' ')[0])))
    : [];

  return (
    <div>
      {/* Header section with title and description */}
      <header>
        <h1>Weather Dashboard</h1>
        <p>This dashboard provides current weather data for various cities in India. Select a city from the dropdown menu to view the weather details including temperature, humidity, and more.</p>
      </header>
      {/* Main section with dropdowns and charts */}
      <main>
        <div className='dropdown-container'>
          <div>
            {/* Dropdown for selecting a city */}
            <label htmlFor="city-select">Select a city: </label>
            <select id="city-select" value={selectedCity} onChange={handleCityChange}>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            {/* Dropdown for selecting a date */}
            <label htmlFor="date-select">Select a date: </label>
            <select id="date-select" value={selectedDate} onChange={handleDateChange}>
              {availableDates.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Display charts and table if weather data is available */}
        {weatherData && (
          <div className='charts-container'>
            <BarChart weatherData={weatherData} selectedDate={selectedDate} />
            <WeatherTable weatherData={weatherData} />
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherDashboard;
