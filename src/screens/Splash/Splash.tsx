import React from 'react';
import {NavigationSwitchScreenProps} from 'react-navigation';
import {connect} from 'react-redux';
//
import {Wrapper} from '../../components/index';
import {RootState, userSelect} from '../../redux/indexIE';
import {routeName} from '../../routes/routeName';

// Durum ve Özellikler
const MapStateProps = (state: RootState) => ({
  user: userSelect(state),
});

const MapDispatchProps = {};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;

type Props = NavigationSwitchScreenProps<{}> & ReduxProps;

// Bileşen
class Splash extends React.Component<Props> {
  componentDidMount() {
    const {user, navigation} = this.props;
    const routeN = user ? routeName.HomeStack : routeName.AuthStack;

    navigation.navigate(routeN);
  }

  render() {
    return <Wrapper />;
  }
}

export default connect(MapStateProps, MapDispatchProps)(Splash);
