import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { mapboxApiKey } from '../../../environment';
import { getInfoWeather } from '../../request';

function initGeocoderActions(geocoder, map) {
  const locationWeather = document.querySelector('.location-weather');
  const degreesWeather = document.querySelector('.degrees-weather');
  const descriptionWeather = document.querySelector('.description-weather');
  const windSpeed = document.querySelector('.wind-speed');
  const precipitation = document.querySelector('.precipitation');
  const humidityWeather = document.querySelector('.humidity'); // назвал humidityWeather
  // тк в промисе есть humidity, так и так работает, но мне кажется лучше без совпадений
  geocoder.on('result', (results) => {
    console.log(results);
    const lon = results.result.center[0];
    const lat = results.result.center[1];
    map.flyTo({
      center: results.result.center,
    });
    getInfoWeather(lon, lat).then((item) => {
      console.log(item); // можно было вывести город с промиса погоды, но я вывожу с геокодера,
      // так как в питере указывается остров - 23 stroka
      locationWeather.textContent = results.result.text;
      degreesWeather.textContent = Math.ceil(item.main.temp).toString();
      descriptionWeather.textContent = item.weather[0].description;
      windSpeed.textContent = item.wind.speed;
      precipitation.textContent = item.clouds.all;
      humidityWeather.textContent = item.main.humidity;
    });
  });
}

function initGeocoder(map) {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  });
  geocoder.addTo('#geocoder-container');
  initGeocoderActions(geocoder, map);
}

export function initMap() {
  mapboxgl.accessToken = mapboxApiKey;

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [53, 50], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  initGeocoder(map);
}
