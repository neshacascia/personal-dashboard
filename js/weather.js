const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = config.WEATHER_API_KEY;
const weatherIconDisplay = document.querySelector('#weather-icon');

let lat;
let lon;

// gets user's weather based on current location:
navigator.geolocation.getCurrentPosition(position => {
  lat = position.coords.latitude.toFixed(2);
  lon = position.coords.longitude.toFixed(2);

  displayCelsiusWeather();
});

async function displayCelsiusWeather() {
  try {
    const response = await fetch(
      `${baseUrl}?lat=${lat}&lon=${lon}${apiKey}&units=metric`
    );
    if (response.ok) {
      const data = await response.json();

      displayWeatherIcon(data);

      document.querySelector('#location').textContent = data.name;
      document.querySelector('#current-temp').textContent =
        Math.ceil(data.main.temp) + '°C';
      document.querySelector('#description').textContent =
        data.weather[0].description;
      document.querySelector('#feels-temp').textContent =
        Math.ceil(data.main.feels_like) + ' °C';
      document.querySelector('#wind').innerHTML =
        data.wind.speed + `<span class="metrics"> km/h</span>`;
      document.querySelector('#humidity').innerHTML =
        data.main.humidity + `<span class="metrics"> %</span>`;
    }
  } catch (error) {
    console.log(error);
  }
}

// renders icons based on the weather and time of day:
function displayWeatherIcon(data) {
  if (data.weather[0].description === 'clear sky') {
    if (isDayTime) {
      weatherIconDisplay.src = weatherIcons.clear.day;
    } else {
      weatherIconDisplay.src = weatherIcons.clear.night;
    }
  } else if (data.weather[0].description === 'few clouds') {
    if (isDayTime) {
      weatherIconDisplay.src = weatherIcons.fewClouds.day;
    } else {
      weatherIconDisplay.src = weatherIcons.fewClouds.night;
    }
  } else if (data.weather[0].description === 'scattered clouds') {
    weatherIconDisplay.src = weatherIcons.scatteredClouds;
  } else if (data.weather[0].description === 'broken clouds') {
    weatherIconDisplay.src = weatherIcons.brokenClouds;
  } else if (data.weather[0].description === 'overcast clouds') {
    weatherIconDisplay.src = weatherIcons.brokenClouds;
  } else if (data.weather[0].description.includes('shower rain')) {
    weatherIconDisplay.src = weatherIcons.showerRain;
  } else if (data.weather[0].description.includes('rain')) {
    weatherIconDisplay.src = weatherIcons.rain;
  } else if (data.weather[0].description.includes('thunderstorm')) {
    weatherIconDisplay.src = weatherIcons.thunderstorms;
  } else if (data.weather[0].description.includes('snow')) {
    weatherIconDisplay.src = weatherIcons.snow;
  } else if (data.weather[0].description.includes('drizzle')) {
    weatherIconDisplay.src = weatherIcons.showerRain;
  } else {
    weatherIconDisplay.src = weatherIcons.mist;
  }
}

const weatherIcons = {
  clear: {
    day: '../assets/weather-icons/clear-sky.svg',
    night: '../assets/weather-icons/clear-night.svg',
  },
  fewClouds: {
    day: '../assets/weather-icons/few-clouds.svg',
    night: '../assets/weather-icons/few-clouds-night.svg',
  },
  scatteredClouds: '../assets/weather-icons/scattered-clouds.svg',
  brokenClouds: '../assets/weather-icons/broken-clouds.svg',
  showerRain: '../assets/weather-icons/shower-rain.svg',
  rain: {
    day: '../assets/weather-icons/rain-day.svg',
    night: '../assets/weather-icons/rain-night.svg',
  },
  thunderstorms: '../assets/weather-icons/thunderstorms.svg',
  snow: '../assets/weather-icons/snow.svg',
  mist: '../assets/weather-icons/mist.svg',
};
