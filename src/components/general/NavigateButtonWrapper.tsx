import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

import {TouchableScale} from '../index';

// Kullanılacak Ana Bileşen
const NavbarButtonWrapper: React.FC<BottomTabBarButtonProps> = ({
  children,
  style,
  onPress,
}) => (
  <View style={[style, styles.container]}>
    <TouchableScale
      onPress={onPress}
      initScale={0.9}
      scaleFactor={0.9}
      style={styles.touchi}>
      {children}
    </TouchableScale>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  touchi: {
    flex: 1,
  },
});

export default NavbarButtonWrapper;
