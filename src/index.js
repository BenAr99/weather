import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { getGeocoder, getMap } from './modules/map/map';
import { getInfoWeather } from './request';
import { arrangementReceivedData } from './modules/weather/weather';

const map = getMap();
const geocoder = getGeocoder(map, '#geocoder-container');

geocoder.on('result', (results) => {
  const lon = results.result.center[0];
  const lat = results.result.center[1];
  getInfoWeather(lon, lat).then((item) => {
    arrangementReceivedData(results, item);
  });
});
