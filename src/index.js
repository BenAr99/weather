import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { mapboxApiKey } from '../environment';

mapboxgl.accessToken = mapboxApiKey;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [53, 50], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl,
});

// document.querySelector('.mapboxgl-ctrl-geocoder--input').className = 'form-control';
// document.querySelector('.mapboxgl-ctrl-geocoder--icon-search').remove();
// map.addControl(geocoder);
geocoder.addTo('#geocoder-container'); // прочитать addTo
geocoder.on('result', (results) => {
  map.flyTo({
    center: results.result.center,
  });
});
