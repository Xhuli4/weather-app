const API_KEY = "f8114156fb5c0e4d6928ad9f0665a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");
const cityName = document.getElementById("city-name");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

async function getWeatherData(city) {
    try {
        const response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (response.ok) {
            updateUI(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        alert(error.message);
    }
}

function updateUI(data) {
    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temperature.textContent = data.main.temp;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    const weatherIcon = document.getElementById("weather-icon");
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDisplay.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert("Please enter a city name");
    }
});
