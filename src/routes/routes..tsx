import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  StackActions,
} from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

// Uygulama İçi
import {Header, NavigateButtonWrapper, NavigationWrapper} from '../components';
import {config} from '../config/config';
