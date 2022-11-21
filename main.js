const searchBtn = document.querySelector('#search-btn');
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = config.WEATHER_API_KEY;
const timeEl = document.querySelector('#time');
const currentDate = new Date();
const hour = new Date().getHours();
const isDayTime = hour >= 6 && hour <= 19 ? true : false;
const weatherIconDisplay = document.querySelector('#weather-icon');

document.querySelector('#date').textContent = currentDate.toDateString();

setInterval(
  () =>
    (timeEl.textContent = new Date().toLocaleTimeString('en-us', {
      timeStyle: 'short',
    })),
  1000
);

// gets user's weather based on current location:
navigator.geolocation.getCurrentPosition(position => {
  let lat = position.coords.latitude.toFixed(2);
  let lon = position.coords.longitude.toFixed(2);

  displayUserWeather();

  async function displayUserWeather() {
    try {
      const response = await fetch(
        `${baseUrl}?lat=${lat}&lon=${lon}${apiKey}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();

        displayWeatherIcon();

        document.querySelector('#location').textContent = data.name;
        document.querySelector('#current-temp').textContent =
          Math.ceil(data.main.temp) + '° C';
        document.querySelector('#description').textContent =
          data.weather[0].description;
        document.querySelector('#feels-temp').textContent =
          Math.ceil(data.main.feels_like) + ' °C';
        document.querySelector('#wind').innerHTML =
          data.wind.speed + `<span class="metrics"> km/h</span>`;
        document.querySelector('#humidity').innerHTML =
          data.main.humidity + `<span class="metrics"> %</span>`;

        console.log(typeof data.weather[0].description);

        function displayWeatherIcon() {
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
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// gets weather based on user's search input:
searchBtn.addEventListener('click', getWeather);

async function getWeather() {
  try {
    const city = document.querySelector('.search-input').value.toLowerCase();

    const response = await fetch(`${baseUrl}?q=${city}${apiKey}&units=metric`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      document.querySelector('#location').textContent = data.name;
      document.querySelector('#current-temp').textContent =
        Math.ceil(data.main.temp) + '° C';
      document.querySelector('#description').textContent =
        data.weather[0].description;
      document.querySelector('#feels-temp').textContent =
        Math.ceil(data.main.feels_like) + ' °C';
      document.querySelector('#wind').innerHTML =
        data.wind.speed + `<span class="metrics"> km/h</span>`;
      document.querySelector('#humidity').innerHTML =
        data.main.humidity + `<span class="metrics"> %</span>`;

      displayWeatherIcon();

      function displayWeatherIcon() {
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
      document.querySelector('.search-input').value = '';
    }
  } catch (error) {
    console.log(error);
  }
}

const weatherIcons = {
  clear: {
    day: './assets/weather-icons/clear-sky.svg',
    night: './assets/weather-icons/clear-night.svg',
  },
  fewClouds: {
    day: './assets/weather-icons/few-clouds.svg',
    night: './assets/weather-icons/few-clouds-night.svg',
  },
  scatteredClouds: './assets/weather-icons/scattered-clouds.svg',
  brokenClouds: './assets/weather-icons/broken-clouds.svg',
  showerRain: './assets/weather-icons/shower-rain.svg',
  rain: {
    day: './assets/weather-icons/rain-day.svg',
    night: './assets/weather-icons/rain-night.svg',
  },
  thunderstorms: './assets/weather-icons/thunderstorms.svg',
  snow: './assets/weather-icons/snow.svg',
  mist: './assets/weather-icons/mist.svg',
};

// to-do list functionality:
let toDoInput = document.querySelector('.to-do-input');
let itemsLeft = 0;

toDoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addToDoItem();
    toDoInput.value = '';
  }

  function addToDoItem() {
    let toDoItem = toDoInput.value;

    itemsLeft++;
    document.querySelector('#items-left').textContent =
      itemsLeft + ' items left';

    document.querySelector('#to-do-list').innerHTML += `
      <li class="to-do-item">
        <div class="checkbox-container">
          <button id="completed" class="checkbox" type="button"></button>
        </div>
        <p class="to-do">${toDoItem}</p>
      </li>`;
  }
});

getZenQuote();

async function getZenQuote() {
  try {
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.json();

    const randomNum = Math.floor(Math.random() * data.length);

    document.querySelector('.quotes-container').innerHTML = `
      <p class="quote">${data[randomNum].text}</p>
      <span class="quote-author">- ${data[randomNum].author}</span>`;
  } catch (error) {
    console.log(error);
  }
}
