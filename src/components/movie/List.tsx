import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {MovieEmpty} from '../../icons';
import {MovieID} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';
import {movieIDsKeyExtract} from '../../utils/movie';
import Footer from '../general/Footer';
import Info from '../general/Info';
