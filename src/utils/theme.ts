import {StyleSheet, TextStyle} from 'react-native';

import {phoneHeight} from './dimension';
import {config} from '../config/config';
import {getFontStyle} from './font';

// Tiplerin Hazırlanması
interface Typography {
  headingOne: TextStyle;
  headingTwo: TextStyle;
  headingThree: TextStyle;
  headingFour: TextStyle;
  headingFive: TextStyle;
  headingSix: TextStyle;
  buttonHeader: TextStyle;
  buttonText: TextStyle;
  paragraphOne: TextStyle;
  paragraphTwo: TextStyle;
  paragraphThree: TextStyle;
  paragraphFour: TextStyle;
}

// Hazırlanan Yazı Nesnelerinin Dışarıya Aktarılması
export type TypographyKey = keyof Typography;

// Yerel Renklerin Yazılması
const COLORS = {
  black: '#000000',
  darkest: '#121212',
  darker: '#1a1a1a',
  dark: '#353535',
  light: '#828282',
  lighter: '#cfcfcf',
  lightest: '#f8f8f8',
  white: '#fff',
  transparentBlackOne: 'rgba(0,0,0,0.6)',
  transparentBlackTwo: 'rgba(0,0,0,0.4)',
  transparentBlackThree: 'rgba(0,0,0,0.2)',
  transparentBlackFour: 'rgba(0,0,0,0.1)',
  transparentWhiteOne: 'rgba(255,255,255,0.6)',
  transparentWhiteTwo: 'rgba(255,255,255,0.4)',
  transparentWhiteThree: 'rgba(255,255,255,0.2)',
  transparentWhiteFour: 'rgba(255,255,255,0.1)',
  emerland: '#2ecc71',
  clemerland: '#00af60',
  forestgreen: '#228B22',
  green: '#008000',
  focys: 'rgba(250,250,250,0.5)',

  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
};

// Tema Bileşenlerinin Hazırlanması
export const THEME = {
  // Boyutların Hazırlanması
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
    xxl: 64,
  },
  // Özelliklerin Hazırlanması
  specification: {
    statusBarHeight: phoneHeight,
    get fullHeight() {
      return phoneHeight + this.statusBarHeight;
    },
    smallICON: 24,
    mediumICON: 32,
    largeICON: 48,
    hugeICON: 96,
    activitySmallIndicatorSize: config.isAndroid ? 32 : <const>'small',
    activityIndicatorSize: config.isAndroid ? 64 : <const>'large',
    posterRatio: 0.66,
    backdropRatio: 1.78,
  },
  // Renklerin Bileşenlerinin Genel Kullanıma Hazırlanması
  COLORS: {
    ...COLORS,
    background: COLORS.darker,
    header: COLORS.darkest,
    bottomNavigation: COLORS.darkest,
    textInputSelect: `${COLORS.emerland}aa`,
  },

  // Tipografi Olarak Hazırlanması
  Typography: StyleSheet.create<Typography>({
    buttonHeader: {
      fontSize: 18,
      letterSpacing: 0.5,
      ...getFontStyle({weight: 'SemiBold'}),
    },
    buttonText: {
      fontSize: 16,
    },
    headingFive: {
      fontSize: 20,
    },
    headingFour: {
      fontSize: 22,
    },
    headingSix: {
      fontSize: 18,
    },
    headingThree: {
      fontSize: 24,
    },
    headingTwo: {
      fontSize: 28,
    },
    headingOne: {
      fontSize: 36,
    },
    paragraphFour: {
      fontSize: 10,
    },
    paragraphOne: {
      fontSize: 16,
    },
    paragraphThree: {
      fontSize: 12,
    },
    paragraphTwo: {
      fontSize: 14,
    },
  }),
};
