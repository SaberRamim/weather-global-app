import { removeModal, showModal } from "./utils/modal.js"; // Import modal utility functions
import getWeatherData from "./utils/httpReq.js"; // Import function to fetch weather data
import { getWeekDay } from "./utils/customeDate.js"; // Import function to get the day of the week

const BASE_URL = "https://api.openweathermap.org/data/2.5"; // Base URL for the weather API
const API_KEY = "c566e82a494b5c1a44238a45ee656084"; // Your OpenWeatherMap API key

// Select DOM elements
const searchInput = document.querySelector("input"); // Input field for city name
const searchButton = document.querySelector("button"); // Button to trigger search
const weatherContainer = document.getElementById("weather"); // Container for current weather
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location"); // Icon for geolocation
const modalButton = document.getElementById("modal-button"); // Button to close the modal
// Function to render current weather data
const renderCurrentWeather = (data) => {
  if (!data) return; // Exit if no data is provided
  const weatherJsx = `  
  <h1>${data.name}, ${data.sys.country}</h1>  
  <div id="main">  
    <img alt="weather icon" src="https://openweathermap.org/img/w/${
      data.weather[0].icon
    }.png"></img>  
    <span>${data.weather[0].main}</span>  
    <p>${Math.round(data.main.temp)} °C</p>  
  </div>  

  <div id="info">  
    <p>Humidity: <span>${data.main.humidity} %</span></p>  
    <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>  
  </div>  
  `;
  weatherContainer.innerHTML = weatherJsx; // Update the weather container with the generated HTML
};

// Function to render forecast weather data
const renderForecastWeather = (data) => {
  if (!data) return; // Exit if no data is provided

  forecastContainer.innerHTML = ""; // Clear previous forecast data
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00")); // Filter forecast data for noon updates
  data.forEach((i) => {
    const forecastJsx = `  
        <div>  
            <img alt="weather icon" src="https://openweathermap.org/img/w/${
              i.weather[0].icon
            }.png"></img>  
            <h3>${getWeekDay(i.dt)}</h3>  
            <p>${Math.round(
              i.main.temp
            )} °C</p> <!-- Fixed to use 'i.main.temp' instead of 'data.main.temp' -->  
            <span>${i.weather[0].main}</span>  
        </div>  
    `;
    forecastContainer.innerHTML += forecastJsx; // Append each forecast item to the forecast container
  });
};

// Function to handle search button click
const searchHandler = async () => {
  const cityName = searchInput.value; // Get the city name from the input

  if (!cityName) {
    showModal("Please Enter City Name!"); // Show modal if no city name is entered
    return;
  }

  const currentData = await getWeatherData("current", cityName); // Fetch current weather data
  renderCurrentWeather(currentData); // Render current weather
  const forcastData = await getWeatherData("forecast", cityName); // Fetch forecast data
  renderForecastWeather(forcastData); // Render forecast weather
};

// Callback function for successful geolocation
const positionCallback = async (position) => {
  const currentData = await getWeatherData("current", position.coords); // Fetch current weather using coordinates
  renderCurrentWeather(currentData); // Render current weather
  const forecastData = await getWeatherData("forecast", position.coords); // Fetch forecast data using coordinates
  renderForecastWeather(forecastData); // Render forecast weather
};

// Callback function for geolocation errors
const errorCallback = (error) => {
  showModal(error.message); // Show modal with error message
};

// Function to handle location icon click
const locationhandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback); // Get current position
  } else {
    showModal("Your Browser Does Not Support Geolocation"); // Show modal if geolocation is not supported
  }
};

// Function to initialize the app with default city (Tehran)
const initHandler = async () => {
  const currentData = await getWeatherData("current", "tehran"); // Fetch current weather for Tehran
  renderCurrentWeather(currentData); // Render current weather
  const forecastData = await getWeatherData("forecast", "tehran"); // Fetch forecast data for Tehran
  renderForecastWeather(forecastData); // Render forecast weather
};

// Event listeners for button clicks
searchButton.addEventListener("click", searchHandler); // Search button click event
locationIcon.addEventListener("click", locationhandler); // Location icon click event
modalButton.addEventListener("click", removeModal); // Modal close button click event
document.addEventListener("DOMContentLoaded", initHandler); // Initialize app when DOM is fully loaded
