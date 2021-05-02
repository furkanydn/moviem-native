import React from 'react';
import {BackHandler, PanResponder, View} from 'react-native';
import {connect} from 'react-redux';
import {StyleSheets} from '../../StyleSheets';
import {Alert, Search} from '../../icons/index';
import {
  RootState,
  searchMoviePageRequest,
  searchMovieRequest,
  searchTextChange,
  searchLoadingSelect,
  searchPagePendingSelect,
  searchRequestPendingSelect,
  searchRequestSlowSelect,
  searchTextEmptySelect,
  searchMovieIDSelect,
  searchTextSelect,
} from '../../redux/indexIE';
import {Info,List} from '../index'
