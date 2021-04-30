import React from 'react';
import {StyleSheet} from 'react-native';
import {THEME} from '../../utils/theme';
import {TextView, TouchableHighView, TouchableHighViewProps} from '../index';

// Durum ve Kalıplar
type OwnProps = {
  icon: React.ReactNode;
  text: string;
};

type Props = OwnProps & TouchableHighViewProps;

// Bileşen
const ImageButton: React.FC<Props> = ({text, icon, ...props}) => (
  <TouchableHighView {...props} contentStyle={styles.touch}>
    {icon}
    {text && (
      <TextView style={styles.text} type="paragraphTwo">
        {text}
      </TextView>
    )}
  </TouchableHighView>
);

const styles = StyleSheet.create({
  touch: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: THEME.spacing.xs,
  },
});

export default React.memo(ImageButton);
