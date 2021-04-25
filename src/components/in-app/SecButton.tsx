import React from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {THEME} from '../../utils/theme';
import PriButton from './PriButton';
import {TouchableScaleProps} from '../general/TouchableScale';

// Durumlar ve Kalıplar
type OwnProps = {
  textStyle?: TextStyle;
  style?: ViewStyle;
  color?: string;
  text?: string;
  stretch?: boolean;
};

type Props = OwnProps & TouchableScaleProps;

// Bileşenler
const SecButton: React.FC<Props> = props => {
  const {
    children,
    style,
    textStyle,
    color = THEME.COLORS.clemerland,
    ...otherProps
  } = props;

  return (
    <PriButton
      style={[styles.button, style]}
      color={color}
      textStyle={StyleSheet.flatten([{color}, textStyle])}
      {...otherProps}>
      {children}
    </PriButton>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: undefined,
    borderWidth: 1,
  },
});

export default SecButton;
