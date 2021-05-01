import React from 'react';
import {StyleSheet, View} from 'react-native';
import {socialActMap} from '../../redux/explore/exploreData';
import {SwipeThresh, Label} from '../index';

// Durum ve Özellikler
type Props = {
  swipeThresh: SwipeThresh;
};

// Bileşen
class CardLabel extends React.PureComponent<Props> {
  render() {
    const {swipeThresh} = this.props;
    const {toTop, toRight, toLeft} = swipeThresh;

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Label style={styles.lefts} opacity={toLeft} type={socialActMap.left} />
        <Label
          style={styles.rights}
          opacity={toRight}
          type={socialActMap.right}
        />
        <Label style={styles.tops} opacity={toTop} type={socialActMap.top} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tops: {
    alignSelf: 'center',
    bottom: 105,
  },
  lefts: {
    top: 70,
    right: 30,
    transform: [{rotate: '15deg'}],
  },
  rights: {
    top: 70,
    left: 30,
    transform: [{rotate: '-15deg'}],
  },
});

export default CardLabel;
