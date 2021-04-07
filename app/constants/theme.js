import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  black: '#131418',
  white: '#C0C0C0',
  gray: '#808080',
  blue: '#1E90FF',
};

export const SIZES = {
  // Global boyutlar
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Başlık boyutları
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  bodyOne: 30,
  bodyTwo: 22,
  bodyThr: 16,
  bodyFour: 14,

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
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
