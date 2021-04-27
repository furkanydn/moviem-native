import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {THEME} from '../../utils/theme';

// Bileşen
const Footer: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator
      size={THEME.specification.activitySmallIndicatorSize}
      color={THEME.COLORS.lightest}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.spacing.m,
  },
});

export default Footer;
