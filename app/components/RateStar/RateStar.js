import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {StarFull, StarHafl, StarEmpty} from '../../icons/Star/index';

interface RateStarProps {
  fillFull: boolean;
  fillHalf: boolean;
}

const RateStar = memo((props: RateStarProps) => {
  return (
    <View style={style.star}>
      {props.fillFull ? (
        <StarFull />
      ) : props.fillHalf ? (
        <StarHafl />
      ) : (
        <StarEmpty />
      )}
    </View>
  );
});

export default RateStar;

const style = StyleSheet.create({
  star: {marginLeft: 3},
});
