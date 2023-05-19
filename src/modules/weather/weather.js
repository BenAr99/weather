const locationWeather = document.querySelector('.location-weather'); // можно ли оптимизир
const degreesWeather = document.querySelector('.degrees-main-weather');
const descriptionWeather = document.querySelector('.description-weather');
const windSpeed = document.querySelector('.wind-speed');
const precipitation = document.querySelector('.precipitation');
const humidityWeather = document.querySelector('.humidity'); // назвал humidityWeather
// тк в промисе есть humidity, так и так работает, но мне кажется лучше без совпадений
function iconDefinition() {}

function initIconInfoWeather(item) {
  const mainIconWeather = document.querySelector('.icon-main-weather');

  mainIconWeather.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
}

function initTextInfoWeather(results, item) {
  locationWeather.textContent = results.result.place_name;
  degreesWeather.textContent = Math.ceil(item.main.temp).toString();
  descriptionWeather.textContent = item.weather[0].description;
  windSpeed.textContent = `Wind: ${item.wind.speed}m/s`;
  precipitation.textContent = `Cloud: ${item.clouds.all}%`;
  humidityWeather.textContent = `Humidity: ${item.main.humidity}%`;
}
export function ArrangementReceivedData(results, item) {
  console.log(item);
  initTextInfoWeather(results, item);
  initIconInfoWeather(item);
}
