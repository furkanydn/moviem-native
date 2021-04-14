import React, {memo} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Clock, Date} from '../../icons';
import {Rate} from '../index';
import {COLORS, FONTS} from '../../constants';

interface PopularProps {
  img: any;
  name: string;
  rate: number;
  review: number;
  time: number;
  date: number;
  onPress: () => void;
}

const Item = memo((props: PopularProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image resizeMode="cover" style={styles.image} source={props.img} />
      <Text style={styles.textHeaderTitle}>{props.name}</Text>
      <View style={styles.viewRate}>
        <Rate rate={props.rate} />
        <Text style={styles.textReview}>{`${props.review} Reviews`}</Text>
      </View>
      <View style={styles.viewFooter}>
        <View style={styles.flexDirection}>
          <Clock />
          <Text style={styles.textReview}>{`${props.time}`}</Text>
        </View>
        <View style={styles.flexDirection}>
          <Date />
          <Text style={styles.textReview}>{`${props.date}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default Item;

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  image: {
    width: 200,
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textHeaderTitle: {
    ...FONTS.bodyThr,
    height: 48,
    fontWeight: '600',
    paddingTop: 4,
    paddingLeft: 8,
  },
  viewRate: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingLeft: 4,
  },
  textReview: {
    ...FONTS.bodyFive,
    fontWeight: '400',
    paddingLeft: 8,
  },
  viewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  flexDirection: {
    flexDirection: 'row',
  },
});
