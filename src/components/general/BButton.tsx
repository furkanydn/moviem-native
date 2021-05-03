import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../../utils/theme';
import {TextView, TouchableHighView, TouchableHighViewProps} from '../index';

// Durum ve Özellikler
const defProps = {
  text: 'Disabled',
  color: THEME.COLORS.lightest,
};

type OwnProps = {
  icon?: React.ReactNode;
  subtext?: string;
} & typeof defProps;

type Props = OwnProps & TouchableHighViewProps;

// Bileşen
class BButton extends React.PureComponent<Props> {
  static defProps = defProps;

  render() {
    const {text, subtext, color, icon, ...props} = this.props;

    return (
      <TouchableHighView
        contentStyle={styles.container}
        scaleFactor={0.98}
        {...props}>
        <View style={styles.content}>
          {icon}
          <View style={[styles.text, icon && {marginLeft: THEME.spacing.m}]}>
            <TextView style={{color}} type="buttonHeader">
              {text}
            </TextView>
            {subtext && (
              <TextView style={styles.subtext} type="paragraphTwo">
                {subtext}
              </TextView>
            )}
          </View>
        </View>
      </TouchableHighView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 72,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    marginLeft: THEME.spacing.l,
  },
  text: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  subtext: {
    color: THEME.COLORS.lighter,
    marginTop: THEME.spacing.xs,
  },
});

export default BButton;
