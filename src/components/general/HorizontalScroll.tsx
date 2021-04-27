import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
//
import {
  sectionData,
  getSectionSelectByKey,
  SectionKeys,
  RootState,
} from '../../redux/indexIE';
import {routeName} from '../../routes/routeName';
