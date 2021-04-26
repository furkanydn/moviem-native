// Ana Uygulama Resimleri Buradan Yönetilecek
import logo from './image/logo.png';

// Kaydırmalar İçin Resimler
import swipeLike from './image/swipe/like.png';
import swipeSave from './image/swipe/save.png';
import swipeSkip from './image/swipe/skip.png';

// Hoşgeldin Ekranı Arkaplanında Kullanılacak Resimler
import welcomeOne from './image/welcome/bumblebee.jpg';
import welcomeTwo from './image/welcome/jurassic_world.jpg';
import welcomeThr from './image/welcome/shutter_island.jpg';
import welcomeFou from './image/welcome/spider_man.jpg';
import welcomeFiv from './image/welcome/the_godfather.jpg';
import welcomeSix from './image/welcome/the_sixth_sense.jpg';

// Durum Özelliği
import {SocialActionType} from './redux/explore/type';

const swipeLab: Record<SocialActionType, number> = {
  favorite: swipeLike,
  watchlist: swipeSave,
  skip: swipeSkip,
};

export default {
  welcomeLAB: [
    welcomeOne,
    welcomeTwo,
    welcomeThr,
    welcomeFou,
    welcomeFiv,
    welcomeSix,
  ],
  swipeLab,
  logo,
};
