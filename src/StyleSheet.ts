// @ts-ignore
import {StyleSheet} from 'react-native';

import {config} from './config/config';
import {THEME} from './utils/theme';

// @ts-ignore
export const StyleSheet = StyleSheet.create({
  displayAreaContainer: {
    flex: 1,
    backgroundColor: THEME.COLORS.background,
  },
  flexContainer: {
    flex: 1,
  },
  defaultShadow: {
    shadowColor: THEME.COLORS.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  textPadding: {
    paddingVertical: config.isAndroid ? 10 : THEME.spacing.m,
  },
});
