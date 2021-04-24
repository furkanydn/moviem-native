// Kalıcı Olarak Kullanılacak Bileşenler
import React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
// Yerel Olarak Burada Kullanılacak Bileşenler
import {THEME} from '../../utils/theme';
import TouchableScale, {TouchableScaleProps} from '../general/TouchableScale';
import TextView from './TextView';

// Durumlar ve Özellikler
type OwnProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  text: string;
  color?: string;
};

type Props = OwnProps & TouchableScaleProps;

export type TextButtonProp = Props;

// Bileşenler
const TextButton: React.FC<Props> = props => {
  const {
    color = THEME.COLORS.emerland,
    text,
    textStyle,
    style,
    ...otherProps
  } = props;

  return (
    <TouchableScale style={[styles.button, style]} {...otherProps}>
      <TextView style={[styles.text, {color}, textStyle]} type="buttonText">
        {text}
      </TextView>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: undefined,
  },
  text: {
    color: THEME.COLORS.lightest,
    paddingHorizontal: THEME.spacing.m,
  },
});

export default TextButton;
