const dateMainDay = document.querySelector('.date-main-day');
const locationWeather = document.querySelector('.location-weather');
const degreesWeather = document.querySelector('.degrees-main-weather');
const descriptionWeather = document.querySelector('.description-weather');
const windSpeed = document.querySelector('.wind-speed');
const precipitation = document.querySelector('.precipitation');
const humidityWeather = document.querySelector('.humidity');

function initIconInfoWeather(item) {
  const mainIconWeather = document.querySelector('.icon-main-weather');
  mainIconWeather.src = `http://openweathermap.org/img/wn/${item.list[0].weather[0].icon}.png`;
}

function mainTextInfo(results, item) {
  dateMainDay.textContent = new Date(item.list[0].dt_txt.split(' ')[0]);
  dateMainDay.textContent = dateMainDay.textContent.split(' ').splice(0, 4).join(' ');

  locationWeather.textContent = results.result.place_name;
  degreesWeather.textContent = Math.ceil(item.list[0].main.temp).toString();
  descriptionWeather.textContent = item.list[0].weather[0].description;
  windSpeed.textContent = `Wind: ${item.list[0].wind.speed}m/s`;
  precipitation.textContent = `Cloud: ${item.list[0].clouds.all}%`;
  humidityWeather.textContent = `Humidity: ${item.list[0].main.humidity}%`;
}

function creatingAdditionalDays(weatherNextThreeDay) {
  const initDayWeek = document.querySelectorAll('.day-week');
  initDayWeek.forEach((element, index) => {
    const dayWeek = new Date(weatherNextThreeDay[index].dt_txt.split(' ')[0]).getDay();
    switch (dayWeek.toString()) {
      case '0':
        element.textContent = 'Sunday';
        break;
      case '1':
        element.textContent = 'Monday';
        break;
      case '2':
        element.textContent = 'Tuesday';
        break;
      case '3':
        element.textContent = 'Wednesday';
        break;
      case '4':
        element.textContent = 'Thursday';
        break;
      case '5':
        element.textContent = 'Friday';
        break;
      case '6':
        element.textContent = 'Saturday';
        break;
      default:
      // eslint требует писать default, но не знаю что в него вписать поиск в другой ветке
    }
  });
}

function creatingTempAdditionalDays(weatherNextThreeDay) {
  const initTempDay = document.querySelectorAll('.mini-description-next-day span');
  initTempDay.forEach((element, index) => {
    element.textContent = `${Math.ceil(weatherNextThreeDay[index].main.temp)}°`;
  });
  const initIconDay = document.querySelectorAll('.additional-day-icon');
  initIconDay.forEach((element, index) => {
    element.src = `http://openweathermap.org/img/wn/${weatherNextThreeDay[index].weather[0].icon}.png`;
  });
}

function nextDayInfoWeather(weatherNextThreeDay) {
  creatingAdditionalDays(weatherNextThreeDay);
  creatingTempAdditionalDays(weatherNextThreeDay);
}

function sortingInfoWeather(item) {
  /// Отбирает среди 12 меток погоды по дню, именно в 3 часа
  const weatherNextThreeDay = item.list.filter(
    (date) =>
      date.dt_txt.split(' ')[0] > item.list[0].dt_txt.split(' ')[0] &&
      date.dt_txt.split(' ')[1] === '15:00:00',
  );
  nextDayInfoWeather(weatherNextThreeDay);
}

function initTextInfoWeather(results, item) {
  mainTextInfo(results, item);
  sortingInfoWeather(item);
}
export function arrangementReceivedData(results, item) {
  initTextInfoWeather(results, item);
  initIconInfoWeather(item);
}
