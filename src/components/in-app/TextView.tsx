import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {TypographyKey, THEME} from '../../utils/theme';
import {getFontStyle} from '../../utils/font';

// Özellikler ve Durum Bileşenleri
type OwnProps = {
  children: React.ReactNode;
  type?: TypographyKey;
  style?: TextStyle;
};
type Props = OwnProps & TextProps;

// Kullanılacak Ana Bileşen
const TextView = (props: Props) => {
  const {children, style, type = 'paragraphOne', ...otherProps} = props;
  const textStyle = StyleSheet.flatten([
    styles.text,
    THEME.Typography[type],
    style,
  ]);

  return (
    <Text {...otherProps} style={textStyle}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: THEME.COLORS.lightest,
    ...getFontStyle(),
  },
});
