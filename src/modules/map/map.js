import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { mapboxApiKey } from '../../../environment';

export async function getPlace(lon, lat) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?types=poi&access_token=pk.eyJ1Ijoic3VsZWltYW4tMjAwNSIsImEiOiJjbGg5MGl2NnYwMnYyM3BsdGNmaGM5bjhyIn0.8jzysqf1GcWc4-yZzRmxXA`,
  );
  return response.json();
}

export async function getUserCity(lon, lat) {
  return getPlace(lon, lat).then(
    (valueCity) =>
      `${valueCity.features[0].context[3].text}, ${valueCity.features[0].context[4].text}`,
  );
}

export function focusOn(map, center) {
  console.log(center, 'center');
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
