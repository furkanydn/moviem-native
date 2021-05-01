import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../../utils/theme';

const StatusBar = () => <View style={styles.container} />;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: THEME.specification.statusBarHeight,
    backgroundColor: THEME.COLORS.header,
  },
});

export default StatusBar;
