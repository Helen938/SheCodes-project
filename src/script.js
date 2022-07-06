"use strict";

let weather = {
  kyiv: {
    temp: 19.7,
    humidity: 80,
  },
  warsaw: {
    temp: 17.3,
    humidity: 50,
  },
  berlin: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },

  london: {
    temp: -5,
    humidity: 20,
  },
};

function conversionCelsiusToFahrenheit(degreeCelsius) {
  let degreeFahr = Math.round((9 * degreeCelsius + 32 * 5) / 5);
  return degreeFahr;
}

let userCity = prompt("Enter a city");
userCity = userCity ? userCity.trim().toLowerCase() : "Kyiv";

let cityWeatherData = null;

for (let city in weather) {
  if (userCity === city) {
    cityWeatherData = weather[city];
    break;
  }
}

const arrayCityWords = userCity.split(" ");

for (var i = 0; i < arrayCityWords.length; i++) {
  arrayCityWords[i] =
    arrayCityWords[i].charAt(0).toUpperCase() + arrayCityWords[i].slice(1);
}
userCity = arrayCityWords.join(" ");

if (cityWeatherData) {
  let tempCels = cityWeatherData.temp;
  let tempFahr = conversionCelsiusToFahrenheit(tempCels);
  let humidity = cityWeatherData.humidity;

  alert(
    `It is currently ${tempCels}\u00B0C (${tempFahr}\u00B0F) in ${userCity} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userCity}.`
  );
}

function getDateTime() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}, ${hour}:${minute}`;
}

let currentTime = getDateTime();
document.querySelector(".current-weather-time").innerText = currentTime;

function signUp() {
  let formControl = document.querySelector(".form-control");
  let currentCity = document.querySelector(".current-weather-city");
  currentCity.innerText = formControl.value;
}

let temperatureValue = document.querySelector(".temperature-value");
let temperatureCelcius = 16;
let inputGroupForm = document.querySelector(".input-group");
inputGroupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signUp();
  getTemperature(e.target[0].value);
});

temperatureCelcius = Math.round(temperatureCelcius);
let temperatureFahrenheit = conversionCelsiusToFahrenheit(temperatureCelcius);

let buttonCelcius = document.querySelector(".temperature-celcius");
let buttonFahrenheit = document.querySelector(".temperature-fahrenheit");

buttonCelcius.addEventListener("click", (event) => {
  event.preventDefault();
  temperatureValue.innerText = temperatureCelcius;
});

buttonFahrenheit.addEventListener("click", (event) => {
  event.preventDefault();
  temperatureValue.innerText = temperatureFahrenheit;
});

async function getTemperature(city) {
  let apiKey = `4a0400ab8a484401ccec58176245d85c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let response = await axios.get(apiUrl);
  temperatureCelcius = Math.round(response.data.main.temp);
  temperatureValue.innerText = temperatureCelcius;
}
