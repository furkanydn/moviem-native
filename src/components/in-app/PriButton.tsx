// Kalıcı Olarak Kullanılacak Bileşenler
import React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
// Yerel Olarak Burada Kullanılacak Bileşenler
import {THEME} from '../../utils/theme';
import TouchableScale, {TouchableScaleProps} from '../general/TouchableScale';
import TextView from './TextView';

// Durumlar ve Özellikler
type OwnProps = {
  textStyle?: TextStyle;
  style?: ViewStyle;
  color?: string;
  text?: string;
  stretch?: boolean;
};

type Props = OwnProps & TouchableScaleProps;

export type PriButtonProps = Props;

// Bileşenler
const PriButton: React.FC<Props> = props => {
  const {
    children,
    color = THEME.COLORS.emerland,
    text,
    textStyle,
    style,
    stretch,
    ...otherProps
  } = props;

  return (
    <TouchableScale
      style={[
        styles.button,
        {backgroundColor: color, borderColor: color},
        stretch && styles.stretch,
        style,
      ]}
      {...otherProps}>
      {text && (
        <TextView
          style={[styles.text, textStyle]}
          type="buttonHeader"
          numberOfLines={1}>
          {text}
        </TextView>
      )}
      {children}
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  text: {
    color: THEME.COLORS.lightest,
    paddingHorizontal: THEME.spacing.m,
  },
  stretch: {
    marginHorizontal: 26,
    alignSelf: 'stretch',
  },
});

export default PriButton;
