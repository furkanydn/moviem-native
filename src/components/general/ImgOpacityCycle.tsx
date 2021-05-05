import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import Animated, {
  EasingNode,
  Extrapolate,
  interpolateNode,
} from 'react-native-reanimated';
import {THEME} from '../../utils/theme';

// Durum ve Kalıplar
type Props = {
  images: FastImageProps['source'][];
  style?: ViewStyle;
};

// Bileşenler
const showTime = 3500,
  fadeOutTime = 600,
  imageAnimDuration = showTime + fadeOutTime,
  scaleTo = 1.25,
  scaleMidPts = (scaleTo - 1) * (fadeOutTime / imageAnimDuration) + 1;

class ImgOpacityCycle extends React.PureComponent<Props> {
  imageLoadCount = 0;
  contentDimmerAnimValue = new Animated.Value<number>(1);
  cycleAnimValue = new Animated.Value<number>(0);
  fullCycleTime = imageAnimDuration * this.props.images.length - fadeOutTime;

  initAnimation = () => {
    this.cycleAnimValue.setValue(0);
    Animated.timing(this.cycleAnimValue, {
      toValue: 1,
      duration: this.fullCycleTime,
      easing: EasingNode.linear,
    }).start(({finished}) => {
      if (finished) {
        requestAnimationFrame(() => this.initAnimation());
      }
    });
  };

  getFractionByIn = (index: number) => index / this.props.images.length;
  getFractionByTi = (time: number) => time / this.fullCycleTime;
  getAnimatedSlide = (index: number) => {
    const first = index === 0;
    const start = this.getFractionByIn(index);
    const finish = this.getFractionByIn(index + 1);
    const fadeFraction = this.getFractionByTi(fadeOutTime);

    const scale = first
      ? interpolateNode(this.cycleAnimValue, {
          inputRange: [0, finish, 1 - fadeFraction, 1],
          outputRange: [scaleMidPts, scaleTo, 1, scaleMidPts],
          extrapolate: Extrapolate.CLAMP,
        })
      : interpolateNode(this.cycleAnimValue, {
          inputRange: [start - fadeFraction, finish, finish + 0.001],
          outputRange: [1, scaleTo, 1],
          extrapolate: Extrapolate.CLAMP,
        });

    const opacity = first
      ? interpolateNode(this.cycleAnimValue, {
          inputRange: [0, finish - fadeFraction, finish, 1 - fadeFraction, 1],
          outputRange: [1, 1, 0, 0, 1],
          extrapolate: Extrapolate.CLAMP,
        })
      : interpolateNode(this.cycleAnimValue, {
          inputRange: [start - fadeFraction, finish - fadeFraction, finish],
          outputRange: [1, 1, 0],
          extrapolate: Extrapolate.CLAMP,
        });

    return {transform: [{scale}], opacity};
  };

  onImgLoad = () => {
    this.imageLoadCount++;

    if (this.imageLoadCount === this.props.images.length) {
      this.initAnimation();

      Animated.timing(this.contentDimmerAnimValue, {
        toValue: 0,
        duration: 300,
        easing: EasingNode.linear,
      }).start();
    }
  };

  renderImage = () => {
    const {images} = this.props;

    return images
      .map((image, index) => (
        <Animated.View
          key={`${image.toString()}${index}`}
          style={[styles.slide, this.getAnimatedSlide(index)]}>
          <FastImage
            source={image}
            style={styles.image}
            onLoad={this.onImgLoad}
            resizeMode="cover"
          />
        </Animated.View>
      ))
      .reverse();
  };

  render() {
    const {style} = this.props;

    return (
      <View style={style}>
        {this.renderImage()}
        <View style={styles.dimmer} />
        <Animated.View
          style={[styles.background, {opacity: this.contentDimmerAnimValue}]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.COLORS.transparentBlackOne,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.COLORS.background,
  },
});

export default ImgOpacityCycle;
