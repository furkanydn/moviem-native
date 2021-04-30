import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {THEME} from '../../utils/theme';
import {TextView, UserScore} from '../index';

// Durum ve Özellikler
type Props = {
  score: number;
  year: string;
  style?: ViewStyle;
};

// Bileşen
const ScoreYear: React.FC<Props> = ({score, year, style}) => (
  <View style={[styles.container, style]}>
    <UserScore score={score} style={styles.score} />
    <TextView style={styles.year}>{year}</TextView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  score: {
    marginRight: THEME.spacing.s,
  },
  year: {
    color: THEME.COLORS.lighter,
  },
});

export default ScoreYear;
