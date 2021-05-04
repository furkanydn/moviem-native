if (__DEV__) {
  import('./src/config/reactotron');
  import('./src/config/commands');
}

// Uygulama
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import AppContainer from './src/Container';

AppRegistry.registerComponent(appName, () => AppContainer);
