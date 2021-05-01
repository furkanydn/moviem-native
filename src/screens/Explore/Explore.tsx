import React from 'react';
import {
  NavigationStackOptions,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import {connect} from 'react-redux';
//
import {
  AuthLock,
  StatusBar,
  InfoGuest,
  withDelayLoading,
  EMovieDeck,
  Wrapper,
} from '../../components';
import {RootState, isAuthUserSelect} from '../../redux/indexIE';

// Durum ve Özellikler
const MapStateProps = (state: RootState) => ({
  isAuthenticatedUser: isAuthUserSelect(state),
});

const MapDispatchProps = {};

type OwnNavProps = {isAuthenticatedUser?: boolean};
type NavProps = NavigationStackScreenProps<OwnNavProps>;
type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;
type Props = NavProps & ReduxProps;

// Bileşen
class Explore extends React.Component<Props> {
  static navOptions = ({navigation}: NavProps): NavigationStackOptions => {
    const isAuthenticatedUser = navigation.getParam('isAuthenticatedUser');
    return isAuthenticatedUser ? {header: undefined} : {};
  };

  componentDidMount() {
    const {navigation, isAuthenticatedUser} = this.props;
    navigation.setParams({isAuthenticatedUser});
  }

  render() {
    return (
      <Wrapper>
        <AuthLock placeholder={<InfoGuest />}>
          <StatusBar />
          <EMovieDeck />
        </AuthLock>
      </Wrapper>
    );
  }
}

export default connect(
  MapStateProps,
  MapDispatchProps,
)(withDelayLoading(Explore));
