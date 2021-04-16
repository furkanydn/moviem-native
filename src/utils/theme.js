import {TextStyle} from 'react-native';

import {phoneHeight} from '../utils/dimension';
import {config} from '../config/config';

interface Typography {
  headingOne: TextStyle;
  headingTwo: TextStyle;
  headingThere: TextStyle;
  headingFour: TextStyle;
  headingFive: TextStyle;
  headingSix: TextStyle;
  buttonText: TextStyle;
  buttonContainer: TextStyle;
  captionOne: TextStyle;
  captionTwo: TextStyle;
  captionThere: TextStyle;
}
// COLORS
export const COLORS = {
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
  forestgreen: '#228B22',
  green: '#008000',

  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
};
// THEME
export const THEME = {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
    xxl: 64,
  },
  specification: {
    statusBarHeight: phoneHeight,
    get fullHeight() {
      return phoneHeight + this.statusBarHeight;
    },
    smallICON: 20,
    mediumICON: 32,
    largeICON: 48,
    hugeICON: 96,
    activitySmallIndicatorSize: config.isAndroid ? 32 : this.m,
    activityIndicatorSize: config.isAndroid ? 64 : this.xl,
    posterRatio: 0.66,
    backdropRatio: 1.78,
  },
};
