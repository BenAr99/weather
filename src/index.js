import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { getGeocoder, getMap, focusOn } from './modules/map/map';
import { getInfoWeather, initTextInfoWeather } from './modules/weather/weather';
import { showErrorNotification } from './shared/notification';
import { initBackgroundImg } from './modules/background/background';

initBackgroundImg();

const map = getMap();
const geocoder = getGeocoder(map, '#geocoder-container');

geocoder.on('result', (results) => {
  const lon = results.result.center[0];
  const lat = results.result.center[1];
  getInfoWeather(lon, lat)
    .then((item) => {
      focusOn(map, results.result.center);
      initTextInfoWeather(results, item);
      initBackgroundImg();
    })
    .catch((value) => {
      showErrorNotification(value.message);
    });
});
