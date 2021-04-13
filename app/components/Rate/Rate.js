import React from 'react';
import {View, StyleSheet} from 'react-native';
import RateStar from '../RateStar/RateStar';

interface RateProps {
  rate: number;
}

const Rate = (props: RateProps) => {
  return (
    <View style={style.container}>
      <RateStar fillFull={props.rate >= 2} fillHalf={props.rate >= 1} />
      <RateStar fillFull={props.rate >= 4} fillHalf={props.rate >= 3} />
      <RateStar fillFull={props.rate >= 6} fillHalf={props.rate >= 5} />
      <RateStar fillFull={props.rate >= 8} fillHalf={props.rate >= 7} />
      <RateStar fillFull={props.rate >= 10} fillHalf={props.rate >= 9} />
    </View>
  );
};

export default Rate;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
