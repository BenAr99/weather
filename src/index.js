import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import { initMap } from './modules/map/map';
import { initBackgroundImg } from './modules/background/background';

const refreshBg = document.querySelector('.refresh-bg');
refreshBg.style.background = 'url("assets/icons/Refresh BG.png")';

initBackgroundImg();
initMap();
