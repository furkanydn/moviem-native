import React from 'react';
import {Animated, Easing, StyleSheet, View, ViewStyle} from 'react-native';
import {THEME} from '../../utils/theme';

// Yerel Değişken
const scaleTime = 1000;
const easingFunc = Easing.out(Easing.bezier(0.445, 0.05, 0.55, 0.95));

// Durum ve Özellikler
const defProps = {
  color: THEME.COLORS.lightest,
  size: THEME.specification.largeICON,
};

type Props = {
  style?: ViewStyle;
} & typeof defProps;

// Bileşen
class CircleLoading extends React.PureComponent<Props> {
  static defProps = defProps;
  scaleValue = [new Animated.Value(1), new Animated.Value(0)];

  scale = (index: number, toShrink: boolean, onComplete?: () => void) => {
    const animateValue = this.scaleValue[index];
    const toValue = toShrink ? 0.01 : 1;

    Animated.timing(animateValue, {
      toValue,
      easing: easingFunc,
      duration: scaleTime,
      useNativeDriver: true,
    }).start(() => onComplete && onComplete());
  };

  animate = (toShrink: boolean) => {
    this.scale(0, toShrink);
    this.scale(1, !toShrink, () => this.animate(!toShrink));
  };

  componentDidMount() {
    this.animate(true);
  }

  getAnimateStyle = (index: number) => ({
    transform: [{scale: this.scaleValue[index]}],
  });

  render() {
    const {color, size, style} = this.props;
    const Cstyle = {width: size, height: size, backgroundColor: color};

    return (
      <View style={style}>
        <Animated.View
          style={[styles.circle, Cstyle, this.getAnimateStyle(0)]}
        />
        <Animated.View
          style={[
            styles.circle,
            styles.absolute,
            Cstyle,
            this.getAnimateStyle(1),
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {borderRadius: 99, opacity: 0.6},
  absolute: {position: 'absolute'},
});

export default CircleLoading;
