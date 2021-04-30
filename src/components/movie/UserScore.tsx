import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {getFontStyle} from '../../utils/font';
import {movieScoreColor} from '../../utils/movie';
import {TextView} from '../index';

// Durum ve Özellikler
type Props = {
  score: number;
  style?: ViewStyle;
};

// Bileşen
const UserScore: React.FC<Props> = ({score, style, ...props}) => {
  if (!score || score === 0) {
    return null;
  }

  return (
    <TextView
      style={[styles.textS, {color: movieScoreColor(score)}, style]}
      {...props}>
      {`${score} User Score`}
    </TextView>
  );
};

const styles = StyleSheet.create({
  textS: {
    ...getFontStyle({weight: 'Bold'}),
  },
});

export default UserScore;
