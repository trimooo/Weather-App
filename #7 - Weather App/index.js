const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
    const json = JSON.parse(this.responseText);

    if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (json.weather[0].main) {
        case 'Clear':
        image.src = 'images/clear.png';
        break;
        case 'Rain':
        image.src = 'images/rain.png';
        break;
        case 'Snow':
        image.src = 'images/snow.png';
        break;
        case 'Clouds':
        image.src = 'images/cloud.png';
        break;
        case 'Haze':
        image.src = 'images/mist.png';
        break;
        default:
        image.src = '';
    }

    temperature.innerHTML = `${json.main.temp.toFixed(1)}<span>&deg;C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    }
});

    const APIKey = '728b0ee6df5687559812bd3169ad77b7';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    xhr.open('GET', `https://open-weather13.p.rapidapi.com/city/${city}`);
    xhr.setRequestHeader('X-RapidAPI-Key', 'f932c25a48msh62f13ef2225cd40p1af456jsn65018404d970');
    xhr.setRequestHeader('X-RapidAPI-Host', 'open-weather13.p.rapidapi.com');
    xhr.send();
});
