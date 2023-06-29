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

export function initBackgroundImg() {
  const backgroundImg = document.querySelector('.background-image');
  getBackground('overcast clouds').then((data) => {
    backgroundImg.style.background = `url("${data[0].urls.regular}")`;
    backgroundImg.style.backgroundPosition = 'center';
    backgroundImg.style.backgroundRepeat = 'no-repeat';
    backgroundImg.style.backgroundSize = 'cover';
  });
}

const refreshBackgroundButton = document.querySelector('.refresh-background-button');
refreshBackgroundButton.style.background =
  'url("assets/icons/image-on-svgrepo-com.svg") no-repeat center center';

refreshBackgroundButton.onclick = initBackgroundImg;
