import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
//
import {getSmallImageUrl, getBigImageUrl} from '../../api/urlKEY';
import {THEME} from '../../utils/theme';
import TextView from '../in-app/TextView';
import InShadow from '../general/InShadow';
import ProgressiveImage from '../general/ProgressiveImage';

// Yerel Özellikler
const {width} = Dimensions.get('window');
export const backdropTitleHeight = width / THEME.specification.backdropRatio;

// Durum ve Kalıp
type Props = {
  title: string;
  backdropPath: string;
};

// Bileşen
const Backdrop: React.FC<Props> = props => {
  const {title, backdropPath} = props;
  const [source, thumbnailSource] = React.useMemo(
    () => [
      {uri: getBigImageUrl(backdropPath)},
      {uri: getSmallImageUrl(backdropPath)},
    ],
    [backdropPath],
  );

  return (
    <View style={styles.container}>
      <ProgressiveImage
        style={styles.image}
        source={source}
        thumbnailSource={thumbnailSource}
        resizeMode="cover"
      />
      <InShadow
        position="bottom"
        HexColor={THEME.COLORS.background}
        startOpacity={1}
        size={120}
      />
      <View style={styles.title}>
        <TextView type="headingTwo">{title}</TextView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width,
    height: backdropTitleHeight,
    backgroundColor: THEME.COLORS.transparentBlackOne,
  },
  title: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: THEME.spacing.s,
    paddingHorizontal: THEME.spacing.m,
  },
});

export default React.memo(Backdrop);
