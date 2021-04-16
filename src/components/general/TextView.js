import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {COLORS} from '../../utils/theme';

const TextView = (props: Props) => {
  const {children, style, ...otherProps} = props;

  return (
    <Text {...otherProps} style={styles.textview}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textview: {
    color: COLORS.lightest,
    fontFamily: 'Rubik-Regular',
  },
});

export default TextView;
