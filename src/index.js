import * as ymaps3 from 'ymaps3';

console.log(ymaps3);
ymaps3.ready.then(() => {
  const { YMaps } = ymaps3;
  new YMaps({});
});
