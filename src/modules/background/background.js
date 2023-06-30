import { unsplashApiKey } from '../../../environment';
import { showErrorNotification } from '../../shared/notification';

export async function getBackground(description) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}&count=5&query=${description}`,
    );
    return response.json();
  } catch (err) {
    throw new Error('Не удалось загрузить изображение');
  }
}

export async function initBackgroundImg() {
  try {
    const backgroundImg = document.querySelector('.background-image');
    const data = await getBackground('overcast clouds');
    backgroundImg.style.background = `url("${data[0].urls.regular}")`;
    backgroundImg.style.backgroundPosition = 'center';
    backgroundImg.style.backgroundRepeat = 'no-repeat';
    backgroundImg.style.backgroundSize = 'cover';
  } catch (value) {
    showErrorNotification(value.message);
  }
}

const refreshBackgroundButton = document.querySelector('.refresh-background-button');
refreshBackgroundButton.style.background =
  'url("assets/icons/image-on-svgrepo-com.svg") no-repeat center center';

refreshBackgroundButton.onclick = initBackgroundImg;
