import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {THEME} from '../../utils/theme';
import TextView from '../in-app/TextView';

// Durum ve Kalıplar
type Props = {
  imgSource?: FastImageProps['source'];
  renderIcon?: () => JSX.Element;
  text?: string;
  subtext?: string;
};

// Bileşen
class Info extends React.PureComponent<Props> {
  render() {
    const {imgSource, renderIcon, text, subtext} = this.props;

    return (
      <View style={styles.container}>
        {renderIcon
          ? renderIcon()
          : imgSource && (
              <FastImage
                source={imgSource}
                style={styles.image}
                resizeMode="contain"
              />
            )}
        {text && (
          <TextView type="headingThree" style={styles.text}>
            {text}
          </TextView>
        )}
        {subtext && (
          <TextView type="paragraphOne" style={styles.subtext}>
            {subtext}
          </TextView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 140,
  },
  text: {
    marginTop: THEME.spacing.m,
  },
  subtext: {
    color: THEME.COLORS.lighter,
    marginTop: THEME.spacing.xs,
  },
});

export default Info;
