import React from 'react';
import {View} from 'react-native';
import {StyleSheets} from '../../StyleSheets';

// Kalıp
type Props = {};

// Bileşen
const Wrapper: React.FC<Props> = props => {
  const {children} = props;

  return <View style={StyleSheets.displayAreaContainer}>{children}</View>;
};

export default Wrapper;
