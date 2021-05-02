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
import {SectionListNavigationParams} from '../../screens';
import {THEME} from '../../utils/theme';
import {getFontStyle} from '../../utils/font';
import {TextView, TextButton, HorizontalFlatList} from '../index';

// Durum ve Özellikler
type OwnProps = {
  sectionKey: SectionKeys;
};

const MapStateProps = (state: RootState, ownProps: OwnProps) => {
  const sectionKey = ownProps.sectionKey;

  return {
    sectionKey,
    section: getSectionSelectByKey(sectionKey)(state),
  };
};

const MapDispatchProps = {};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;
type Props = ReduxProps & OwnProps & NavigationInjectedProps;

// Bileşen
class HorizontalScroll extends React.PureComponent<Props> {
  morePress = () => {
    const {navigation, sectionKey} = this.props;
    const params: SectionListNavigationParams = {sectionKey};

    navigation.navigate(routeName.SectionListScreen, params);
  };

  render() {
    const {section, sectionKey} = this.props;
    const {movieIDs} = section;
    const {title} = sectionData[sectionKey];

    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TextView style={styles.title} type="headingThree">
            {title}
          </TextView>
          <TextButton
            text="More"
            style={styles.buttonMore}
            textStyle={styles.buttonMoreText}
            onPress={this.morePress}
          />
        </View>
        <HorizontalFlatList movieIDs={movieIDs} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {marginVertical: THEME.spacing.m},
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {marginLeft: THEME.spacing.m},
  buttonMore: {padding: THEME.spacing.s},
  buttonMoreText: {...getFontStyle({weight: 'SemiBold'})},
});

export default connect(
  MapStateProps,
  MapDispatchProps,
)(withNavigation(HorizontalScroll));
