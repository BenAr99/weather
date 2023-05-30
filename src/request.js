import { weatherApiKey } from '../environment';

export async function getInfoWeather(lon, lat) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`,
  );
  if (response.ok) {
    return response.json();
  }
  return console.error('Не удалось загрузить данные о погоде');
}
