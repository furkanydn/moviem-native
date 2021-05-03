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
import {Welcome, Login, Explore, Browse, Library,} from '../screens';
import {THEME} from '../utils/theme';
import {fromRightFade} from './transition';
import {routeName, tabName} from './routeName';

// Yardımcı Nesne
const defaultHeaderObject: NavigationStackOptions = {
  header: props => <Header scene={props.scene} />,
};

const createStackNavigator = (objects: any, options?: any) =>
  createStackNavigator(objects, {
    defaultNavOption: {...defaultHeaderObject},
    cardStyle: {backgroundColor: THEME.COLORS.background},
    headerMode: 'screen',
    transitionConfig: config.isAndroid ? fromRightFade() : undefined,
    ...options,
  });

// Yönlendirmeler
