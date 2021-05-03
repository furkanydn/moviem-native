import React from 'react';
import {NavigationStackScreenProps} from 'react-navigation-stack';
//
import {
  AuthLock,
  BButton,
  TouchableScale,
  InfoGuest,
  withDelayLoading,
  Wrapper,
} from '../../components/index';
import {Heart, Cog, Watch} from '../../icons/index';
import {
  sectionData,
  librarySectionKey,
  LibrarySectionKey,
} from '../../redux/indexIE';
import NavigationService from '../../routes/navigationService';
import {routeName} from '../../routes/routeName';
import {SectionListNavigationParams} from '../Movie/SectionList';

// Durum ve Özellikler
type NavigationProps = NavigationStackScreenProps<{}>;
type Props = NavigationProps;

const librarySIcon: Record<LibrarySectionKey, JSX.Element> = {
  myFavorite: Heart(),
  myWatchlist: Watch(),
};

const navigateSetting = () => {
  NavigationService.navigate(routeName.Settings);
};

// Bileşen
class Library extends React.PureComponent<Props> {
  static navOptions = {
    headerRight: (
      <TouchableScale onPress={navigateSetting}>{Cog()}</TouchableScale>
    ),
  };

  renderLibrary = () => {
    const {navigation} = this.props;

    return librarySectionKey.map(sectionKey => {
      const {title} = sectionData[sectionKey];

      const Click = () => {
        const params: SectionListNavigationParams = {sectionKey};
        navigation.navigate(routeName.SectionListScreen, params);
      };

      const Icon = librarySIcon[sectionKey];

      return (
        <BButton onPress={Click} text={title} icon={Icon} key={sectionKey} />
      );
    });
  };

  render() {
    return (
      <Wrapper>
        <AuthLock placeholder={<InfoGuest />}>{this.renderLibrary()}</AuthLock>
      </Wrapper>
    );
  }
}

export default withDelayLoading(Library);
