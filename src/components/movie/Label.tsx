import React from 'react';
import {Animated, ImageStyle, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageMain from '../../ImageMain';
import {THEME} from '../../utils/theme';

// Durum ve Özellikler
type Props = {
  type: keyof typeof ImageMain.swipeLab;
  style: ImageStyle;
  opacity: Animated.Animated;
};

// Bileşen
const Label = (props: Props) => {
  const {type, style, opacity} = props;
  const ssource = ImageMain.swipeLab[type];

  return (
    <Animated.View style={[styles.container, style, {opacity}]}>
      <FastImage resizeMode="contain" style={styles.label} source={ssource} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {position: 'absolute'},
  label: {height: THEME.spacing.xxl, aspectRatio: 2.5},
});

export default React.memo(Label);
