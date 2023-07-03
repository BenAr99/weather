import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { getGeocoder, getMap, focusOn, positionCityUser } from './modules/map/map';
import { getInfoWeather, initTextInfoWeather } from './modules/weather/weather';
import { showErrorNotification } from './shared/notification';
import { initBackgroundImg } from './modules/background/background';
import { getUserLocation } from './shared/getUserLocation';

initBackgroundImg();

export const map = getMap();
const geocoder = getGeocoder(map, '#geocoder-container');

function main(coordinates) {
  positionCityUser(coordinates[0], coordinates[1]).then((value) => {
    getInfoWeather(coordinates[0], coordinates[1])
      .then((item) => {
        focusOn(map, coordinates);
        initTextInfoWeather(
          `${value.features[0].context[3].text}, ${value.features[0].context[4].text}`,
          item,
        );
      })
      .catch((err) => {
        showErrorNotification(err.message);
      });
  });
}

console.log(positionCityUser(), 'user');
getUserLocation().then((value) => {
  main(value);
});

geocoder.on('result', (results) => {
  const lon = results.result.center[0];
  const lat = results.result.center[1];
  getInfoWeather(lon, lat)
    .then((item) => {
      focusOn(map, results.result.center);
      initTextInfoWeather(results.result.place_name, item);
      initBackgroundImg();
    })
    .catch((err) => {
      showErrorNotification(err.message);
    });
});
