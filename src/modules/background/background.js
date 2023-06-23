import { unsplashApiKey } from '../../../environment';

export async function getBackground(description) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}&count=5&query=${description}`,
  );
  if (response.ok) {
    return response.json();
  }
  return console.error('Не удалось загрузить данные о погоде');
}

const backgroundImg = document.querySelector('body');
export function initBackgroundImg() {
  getBackground('overcast clouds').then((data) => {
    backgroundImg.style.background = `url("${data[0].urls.regular}") no-repeat center center fixed`;
    backgroundImg.style.backgroundSize = 'cover';
    backgroundImg.style.opacity = '0.6';
    // backgroundImg.style.backgroundColor = 'rgba(0, 0, 0, .5)';
  });
}
