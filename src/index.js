import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { getGeocoder, getMap } from './modules/map/map';
import { getInfoWeather, initTextInfoWeather } from './modules/weather/weather';
import { showErrorNotification } from './shared/notification';
import { initBackgroundImg } from './modules/background/background';

const map = getMap();
const geocoder = getGeocoder(map, '#geocoder-container');

geocoder.on('result', (results) => {
  const lon = results.result.center[0];
  const lat = results.result.center[1];
  getInfoWeather(lon, lat)
    .then((item) => {
      initTextInfoWeather(results, item);
    })
    .catch((value) => {
      showErrorNotification(value.message);
    });
});
initBackgroundImg();
