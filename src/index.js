import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { getGeocoder, getMap, focusOn, getUserCity } from './modules/map/map';
import { getInfoWeather, initTextInfoWeather } from './modules/weather/weather';
import { showErrorNotification } from './shared/notification';
import { initBackgroundImg } from './modules/background/background';
import { getUserLocation } from './shared/getUserLocation';

initBackgroundImg();

export const initMap = getMap();
const geocoder = getGeocoder(initMap, '#geocoder-container');

function setWeather(map, valueCity, coordinates) {
  getInfoWeather(coordinates[0], coordinates[1])
    .then((item) => {
      console.log(item);
      focusOn(map, coordinates);
      initTextInfoWeather(valueCity, item);
    })
    .catch((err) => {
      showErrorNotification(err.message);
    });
}

getUserLocation().then((coordinates) => {
  getUserCity(coordinates[0], coordinates[1]).then((valueCity) => {
    setWeather(initMap, valueCity, coordinates);
  });
});

geocoder.on('result', (results) => {
  setWeather(initMap, results.result.place_name, results.result.center);
});
