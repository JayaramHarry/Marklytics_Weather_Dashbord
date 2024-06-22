import axios from 'axios';



// Base URL for the OpenWeatherMap forecast API
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Asynchronous function to fetch weather data for a given location
const fetchWeatherData = async (location) => {
  // Constructing the endpoint URL with the location, units (metric), and API key from environment variables
  const endpoint = `${apiUrl}?q=${location}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

  try {
    // Making the GET request to the API endpoint
    const response = await axios.get(endpoint);
    // Extracting the city and list of weather data from the response
    const { city, list } = response.data;
    // Returning an object containing the city name, country, and list of weather data
    return {
      city: city.name,
      country: city.country,
      list,
    };
  } catch (error) {
    // Logging the error if the request fails
    console.error('Error fetching weather data:', error);
    // Returning null in case of an error
    return null;
  }
};

// Exporting the fetchWeatherData function for use in other parts of the application
export { fetchWeatherData };
