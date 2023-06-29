import { weatherApiKey } from '../../../environment';

const dateMainDay = document.querySelector('.date-main-day');
const locationWeather = document.querySelector('.location-weather');
const degreesWeather = document.querySelector('.degrees-main-weather');
const descriptionWeather = document.querySelector('.description-weather');
const windSpeed = document.querySelector('.wind-speed');
const precipitation = document.querySelector('.precipitation');
const humidityWeather = document.querySelector('.humidity');

export async function getInfoWeather(lon, lat) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`,
    );
    return response.json();
  } catch (err) {
    throw new Error('Не удалось загрузить данные о погоде');
  }
}

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
    let dayOfWeekText;
    const dayWeek = new Date(weatherNextThreeDay[index].dt_txt.split(' ')[0]).getDay();
    switch (dayWeek) {
      case 0:
        dayOfWeekText = 'Sunday';
        break;
      case 1:
        dayOfWeekText = 'Monday';
        break;
      case 2:
        dayOfWeekText = 'Tuesday';
        break;
      case 3:
        dayOfWeekText = 'Wednesday';
        break;
      case 4:
        dayOfWeekText = 'Thursday';
        break;
      case 5:
        dayOfWeekText = 'Friday';
        break;
      case 6:
        dayOfWeekText = 'Saturday';
        break;
      default:
        throw new Error('Я не боюсь ошибаться');
    }
    element.textContent = dayOfWeekText;
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

function sortingInfoWeather(item) {
  const weatherNextThreeDay = item.list.filter(
    (date) =>
      date.dt_txt.split(' ')[0] > item.list[0].dt_txt.split(' ')[0] &&
      date.dt_txt.split(' ')[1] === '15:00:00',
  );
  creatingAdditionalDays(weatherNextThreeDay);
  creatingTempAdditionalDays(weatherNextThreeDay);
}

export function initTextInfoWeather(results, item) {
  mainTextInfo(results, item);
  initIconInfoWeather(item);
  sortingInfoWeather(item);
}
