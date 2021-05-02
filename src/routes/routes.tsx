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
import {config} from '../config/config';
import {Header, NavigateButtonWrapper, NavigationWrapper} from '../components';
import {ExploreIcon, HomeIcon, VideoFolderIcon} from '../icons';
import {Welcome, Login, Explore} from '../screens';
