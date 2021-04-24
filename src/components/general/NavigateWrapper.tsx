import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {BottomTabBar} from '@react-navigation/bottom-tabs';

import {isInternetReachableSelect, RootState} from '../../redux/indexIE';
import {THEME} from '../../utils/theme';
import {TextView} from '../index';

// Durumlar
type BottomTabBarProp = any;

const mapStateToProp = (state: RootState) => ({
  isInternetReachable: isInternetReachableSelect(state),
});

const mapDispatchToProps = {};

type ReduxProp = ReturnType<typeof mapStateToProp> & typeof mapDispatchToProps;

type Prop = ReduxProp & BottomTabBarProp;

// Bileşenler
const NavigationWrapper = (props: Prop) => {
  const {isInternetReachable, ...tabBarProp} = props;

  return (
    <View>
      {isInternetReachable && (
        <Animated.View style={styles.noConnectivity}>
          <TextView style={styles.noText} type="paragraphThree">
            Oops! We could not connect to the internet. Please check whether
            your Wi-Fi or mobile data is turned on.
          </TextView>
        </Animated.View>
      )}
      <BottomTabBar {...tabBarProp} />
    </View>
  );
};

// Stil Bileşeni
const styles = StyleSheet.create({
  noConnectivity: {
    position: 'absolute',
    width: '100%',
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.warning,
    top: -20,
  },
  noText: {
    color: THEME.COLORS.darkest,
  },
});

export default connect(
  mapStateToProp,
  mapDispatchToProps,
)(React.memo(NavigationWrapper));
