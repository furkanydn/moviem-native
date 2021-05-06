import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
//https://github.com/zoontek/react-native-bootsplash
import RNBootSplash from 'react-native-bootsplash';

// Uygulama içi
import {ToastMessage} from './components/index';
import {StyleSheets} from './StyleSheets';
import {
  startNetworkMonitoring,
  stopNetworkMonitoring,
} from './redux/network/action';
import NavigationService from './routes/NavigationService';
import {RootStack} from './routes/routes';

// Durum ve Özellikler
const MapStateProps = () => ({});

const MapDispatchProps = {
  startNetworkMonitoring,
  stopNetworkMonitoring,
};

type ReduxProps = ReturnType<typeof MapStateProps> & typeof MapDispatchProps;
type Props = ReduxProps;

// Bileşen
class Application extends React.PureComponent<Props> {
  bSplashTime: NodeJS.Timeout | undefined;

  componentDidMount() {
    const {startNetworkMonitoring} = this.props;
    startNetworkMonitoring();
    this.bSplashTime = setTimeout(() => {
      RNBootSplash.hide();
    }, 300);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-shadow
    const {stopNetworkMonitoring} = this.props;
    stopNetworkMonitoring();
    this.bSplashTime && clearTimeout(this.bSplashTime);
  }

  render() {
    return (
      <View style={StyleSheets.displayAreaContainer}>
        <RootStack ref={NavigationService.setNavigatorRef} theme="dark" />
        <ToastMessage />
      </View>
    );
  }
}

export default connect(MapStateProps, MapDispatchProps)(Application);
