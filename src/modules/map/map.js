import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { mapboxApiKey } from '../../../environment';

export function focusOn(map, center) {
  map.flyTo({
    center,
  });
}

export function getGeocoder(map, geocoderContainer) {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  });
  geocoder.addTo(geocoderContainer);

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
