import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { mapboxApiKey } from '../../../environment';
import { arrangementReceivedData, getInfoWeather } from '../weather/weather';

function initGeocoderActions(geocoder, map) {
  geocoder.on('result', (results) => {
    const lon = results.result.center[0];
    const lat = results.result.center[1];
    map.flyTo({
      center: results.result.center,
    });
    getInfoWeather(lon, lat).then((item) => {
      arrangementReceivedData(results, item);
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
