import { showModal, removeModal } from "./modal.js"; // Import modal functions for displaying error messages

const BASE_URL = "https://api.openweathermap.org/data/2.5"; // Base URL for the OpenWeatherMap API
const API_KEY = "c566e82a494b5c1a44238a45ee656084"; // Your OpenWeatherMap API key

// Function to fetch weather data based on type (current or forecast) and input data (city name or coordinates)
const getWeatherData = async (type, data) => {
  let url = null; // Initialize URL variable

  // Determine the API endpoint based on the type and input data
  switch (type) {
    case "current":
      if (typeof data === "string") {
        // If data is a city name
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        // If data is an object with latitude and longitude
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
    case "forecast":
      if (typeof data === "string") {
        // If data is a city name
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        // If data is an object with latitude and longitude
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;

    default:
      // Fallback to Tehran if no valid type is provided
      url = `${BASE_URL}/weather?q=tehran&appid=${API_KEY}&units=metric`;
      break;
  }

  try {
    const response = await fetch(url); // Fetch data from the constructed URL
    const json = await response.json(); // Parse the JSON response
    if (+json.cod === 200) {
      return json; // Return the JSON data if the response code is 200 (OK)
    } else {
      showModal(json.message); // Show modal with the error message if the response code is not 200
    }
  } catch (error) {
    showModal("An error occurred when fetching the data."); // Show modal with a generic error message
  }
};

export default getWeatherData; // Export the function for use in other modules
