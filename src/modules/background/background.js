import { getBackground } from '../../request';
import { locationWeather } from '../weather/weather';

const backgroundImg = document.querySelector('body');
export function initBackgroundImg() {
  getBackground('city').then((data) => {
    console.log(data);
    backgroundImg.style.background = `url(${data[0].urls.regular}) no-repeat`;
    console.log(backgroundImg.style.background);
  });
}
