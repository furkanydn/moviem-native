import React from 'react';
import {isNil} from 'lodash';
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {Scene} from 'react-navigation-stack/lib/typescript/types';

// Uygulama İçi
import {THEME} from '../../utils/theme';
import {ChevronLeft} from '../../icons';
import {TextView, TouchableScale} from '../index';

// Özellik ve Durum Bileşenleri
type OwnProps = {
  scene: Scene;
  backgroundStyle?: ViewStyle;
};
type Props = OwnProps & NavigationInjectedProps;

export type HeaderProps = OwnProps;

// Kullanılacak Ana Bileşen
export class Header extends React.PureComponent<Props> {
  onGoBackPress = () => this.props.navigation.goBack();

  render() {
    const {scene, navigation, backgroundStyle} = this.props;
    // navigationOptions nesnesinin özelliklerini statik olarak alma
    const navigationOptions = scene ? scene.descriptor.options : {};
    const {title, headerRight} = navigationOptions;
    const routePath = navigation ? navigation.state.routeName : '';

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.backgroundContainer, backgroundStyle]} />
        <View style={styles.headerWrapper}>
          <View style={styles.leftContentContainer}>
            <TouchableScale activeOpacity={0.6} onPress={this.onGoBackPress}>
              {<ChevronLeft />}
            </TouchableScale>
          </View>
          <View style={styles.rightContentContainer}>
            <TextView numberOfLines={1} type="headingSix">
              {!isNil(title) ? title : routePath}
            </TextView>
          </View>
          <View style={styles.rightContentContainer}>
            {!!headerRight && headerRight}
          </View>
        </View>
      </View>
    );
  }
}

// absoluteFillObject Nesnesi İçin https://reactnative.dev/docs/stylesheet#absolutefillobject
const styles = StyleSheet.create({
  container: {
    height: THEME.specification.fullHeight,
  },
  leftContentContainer: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    marginLeft: THEME.spacing.s,
  },
  rightContentContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    overflow: 'hidden',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: THEME.COLORS.header,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: THEME.specification.statusBarHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 0,
    maxWidth: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withNavigation(Header);
