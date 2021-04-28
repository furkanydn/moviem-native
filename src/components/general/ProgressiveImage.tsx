import React, {useState} from 'react';
import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import FastImage, {FastImageProps, OnLoadEvent} from 'react-native-fast-image';
import Animated, {Easing} from 'react-native-reanimated';

// https://trinity.one/insights/seo/progressive-images/

// Özel animasyonlu resim objesi
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

// Yerel Özellik
const {Value} = Animated;

// Durum ve Özellikler
type OwnProps = {
  source: FastImageProps['source'];
  thumbnailSource: FastImageProps['source'];
  style?: ViewStyle;
  imgStyle?: ImageStyle;
};

type Props = OwnProps & FastImageProps;

// Bileşenler
const ProgressiveImage = (props: Props) => {
  const {
    style,
    source,
    thumbnailSource,
    imgStyle,
    onLoad,
    ...otherProps
  } = props;
  const [imageShown, setImageShown] = useState(false);
  const [imageOpacity] = useState(new Value(0));

  const imageLoad = (event: OnLoadEvent) => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.sin),
    }).start(() => {
      setImageShown(true);
    });

    onLoad && onLoad(event);
  };

  return (
    <Animated.View style={style}>
      {!imageShown && (
        <FastImage
          source={thumbnailSource}
          style={[StyleSheet.absoluteFill, imgStyle]}
          {...otherProps}
        />
      )}
      <AnimatedFastImage
        source={source}
        onLoad={imageLoad}
        style={[
          StyleSheet.absoluteFill,
          {opacity: imageOpacity} as any,
          imgStyle,
        ]}
        {...otherProps}
      />
    </Animated.View>
  );
};

export default React.memo(ProgressiveImage);
