import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  silver: '#C0C0C0',
  gray: '#808080',
  blue: '#1E90FF',
  openBlue: '#A8DADC',
  lightsalmon: '#FFA07A',
  salmon: '#FA8072',
  carrot: '#E67E22',
  darkslategray: '#2F4F4F',
  forestgreen: '#228B22',
  green: '#008000',
  emerland: '#2ECC71',
  amethyst: '#9B59B6',
  greensea: '#16A085',
  fluent: '#6B69D6',
  hunt: '#DA552F',
  sky: '#00AFF0',
  lightpink: '#FFC0CB',
  navajowhite: '#FFDEAD',
  shadow: '#8D979E',
  dot: '#FFFEFA',
  behance: '#131418',
};

export const SIZES = {
  // Global boyutlar
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Başlık boyutları
  h1: 36,
  h2: 22,
  h3: 16,
  h4: 14,
  bodyOne: 30,
  bodyTwo: 18,
  bodyThr: 16,
  bodyFour: 14,
  bodyFive: 12,

  // Uygulama boyutları
  width,
  height,
};

export const FONTS = {
  h1: {fontFamily: 'Rubik-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Rubik-Bold', fontSize: SIZES.h4, lineHeight: 22},
  bodyOne: {
    fontFamily: 'Rubik-Regular',
    fontSize: SIZES.bodyOne,
    lineHeight: 36,
  },
  bodyTwo: {
    fontFamily: 'Rubik-Regular',
    fontSize: SIZES.bodyTwo,
    lineHeight: 30,
  },
  bodyThr: {
    fontFamily: 'Rubik-Regular',
    fontSize: SIZES.bodyThr,
    lineHeight: 22,
  },
  bodyFour: {
    fontFamily: 'Rubik-Regular',
    fontSize: SIZES.bodyFour,
    lineHeight: 22,
  },
  bodyFive: {
    fontFamily: 'Rubik-Regular',
    fontSize: SIZES.bodyFive,
    lineHeight: 18,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
