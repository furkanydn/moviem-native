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
import {Header, NavigateButtonWrapper} from '../components/index';
import {HomeDark, ExploreDark, LibraryDark} from '../icons/index';
import {
  Welcome,
  Login,
  Explore,
  Browse,
  Library,
  Detail,
  SectionList,
  Settings,
  Splash,
} from '../screens/index';
import {THEME} from '../utils/theme';
import {fromRightFade} from './transition';
import {routeName, tabName} from './routeName';
import {getFontStyle} from '../utils/font';

// Yardımcı Nesne
const defaultHeaderObject: NavigationStackOptions = {
  header: props => <Header scene={props.scene} />,
};

const createDefStackNavigator = (objects: any, options?: any) =>
  createStackNavigator(objects, {
    defaultNavigationOptions: {...defaultHeaderObject},
    cardStyle: {backgroundColor: THEME.COLORS.background},
    headerMode: 'screen',
    transitionConfig: config.isAndroid ? fromRightFade() : undefined,
    ...options,
  });

// Yönlendirmeler
const BottomTab = createBottomTabNavigator(
  {
    [tabName.browse]: {
      screen: createDefStackNavigator({
        [tabName.browse]: Browse,
        [routeName.SectionList]: SectionList,
        [routeName.Detail]: Detail,
      }),
    },
    [tabName.explore]: {
      screen: createDefStackNavigator({
        [tabName.explore]: Explore,
      }),
    },
    [tabName.library]: {
      screen: createDefStackNavigator({
        [tabName.library]: Library,
        [routeName.Settings]: Settings,
        [routeName.SectionList]: SectionList,
        [routeName.Detail]: Detail,
      }),
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: THEME.COLORS.bottomNavigation,
      inactiveBackgroundColor: THEME.COLORS.bottomNavigation,
      activeTintColor: THEME.COLORS.lightest,
      inactiveTintColor: THEME.COLORS.light,
      labelStyle: {...getFontStyle()},
      style: {
        height: THEME.specification.bottomBarHeight,
        backgroundColor: THEME.COLORS.bottomNavigation,
        borderTopColor: THEME.COLORS.bottomNavigation,
      },
      keyboardHidesTabBar: false,
    },
    defaultNavigationOptions({navigation}) {
      return {
        tabBarIcon: () => {
          switch (navigation.state.routeName) {
            case tabName.browse:
              return HomeDark();
            case tabName.explore:
              return ExploreDark();
            case tabName.library:
              return LibraryDark();
            default:
              return null;
          }
        },
        tabBarButtonComponent: NavigateButtonWrapper,
        tabBarOnPress: ({navigation, defaultHandler}) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        },
      };
    },
  },
);

const AuthStack = createDefStackNavigator({
  [routeName.AuthWelcome]: {screen: Welcome},
  [routeName.AuthLogin]: {screen: Login},
});

const HomeStack = createStackNavigator(
  {[routeName.BottomTabs]: {screen: BottomTab}},
  {headerMode: 'none'},
);

export const RootStack = createAppContainer(
  createSwitchNavigator({
    [routeName.Splash]: {screen: Splash},
    [routeName.AuthStack]: {screen: AuthStack},
    [routeName.HomeStack]: {screen: HomeStack},
  }),
);
