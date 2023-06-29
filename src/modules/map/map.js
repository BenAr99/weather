import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { mapboxApiKey } from '../../../environment';
import { arrangementReceivedData, getInfoWeather } from '../weather/weather';

function setFlyAction(geocoder, map) {
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

export function getGeocoder(map, geocoderContainer) {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  });
  geocoder.addTo(geocoderContainer);
  setFlyAction(map);

  return geocoder;
}

export function getMap() {
  mapboxgl.accessToken = mapboxApiKey;

  return new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [53, 50], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
}
