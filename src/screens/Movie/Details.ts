import React from 'react';
import {InteractionManager} from 'react-native';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {connect} from 'react-redux';
//
import {withDelayLoading} from '../../components';
import {MovieID} from '../../redux/indexIE';

//
export interface DetailsScreenNavParams {
  movieID: MovieID;
}
