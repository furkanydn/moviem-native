import React from 'react';
import {View, StyleSheet} from 'react-native';
import RateStar from '../RateStar/RateStar';

interface RateProps {
  rate: number;
}

const Rate = (props: RateProps) => {
  return (
    <View style={style.container}>
      <RateStar fillFull={props.rate >= 1} fillHalf={props.rate >= 0.5} />
      <RateStar fillFull={props.rate >= 2} fillHalf={props.rate >= 1.5} />
      <RateStar fillFull={props.rate >= 3} fillHalf={props.rate >= 2.5} />
      <RateStar fillFull={props.rate >= 4} fillHalf={props.rate >= 3.5} />
      <RateStar fillFull={props.rate >= 5} fillHalf={props.rate >= 5.5} />
    </View>
  );
};

export default Rate;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
