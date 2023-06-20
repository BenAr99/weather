import { unsplashApiKey, weatherApiKey } from '../environment';

export async function getInfoWeather(lon, lat) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`,
  );
  if (response.ok) {
    return response.json();
  }
  return console.error('Не удалось загрузить данные о погоде');
}

export async function getBackground(description) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}&count=5&query=${description}`,
  );
  if (response.ok) {
    return response.json();
  }
  return console.error('Не удалось загрузить данные о погоде');
}
