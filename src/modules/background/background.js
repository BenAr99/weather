import { getBackground } from '../../request';

const backgroundImg = document.querySelector('.background-image');
export function initBackgroundImg() {
  getBackground('city').then((data) => {
    backgroundImg.style.background = `url(${data[0].urls.regular}) no-repeat center center fixed`;
    backgroundImg.style.backgroundSize = 'cover';
  });
}
