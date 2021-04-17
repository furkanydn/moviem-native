if (__DEV__) {
  import('./src/configs/reactotron/reactotron');
  import('./src/configs/reactotron/commands');
}

// Uygulama
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import AppContainer from './src/AppContainer';

AppRegistry.registerComponent(appName, () => AppContainer);
