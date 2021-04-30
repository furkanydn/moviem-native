import uuid from 'uuid';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
//
import {getSmallImageUrl} from '../../api/urlKEY';
import {MovieID, RootState, getMovieSelectByID} from '../../redux/indexIE';
import {routeName} from '../../routes/routeName';
import {THEME} from '../../utils/theme';
import {goodMovieRate} from '../../utils/movie';
import {TextView, TouchableScale} from '../index';

// Yerel
const {width} = Dimensions.get('window');
const preWidth = width * 0.27;
export const getMoviePreHeight = () =>
  preWidth / THEME.specification.posterRatio;

// Durumlar ve Özellikler
interface ScreenNavigationParams {
  movieID: MovieID;
}
type OwnProps = {
  movieID?: MovieID;
  highPriority?: boolean;
  withRateBadge?: boolean;
};
