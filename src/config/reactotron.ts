import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import {config} from './config';

//
export const reactotron = Reactotron
  .configure({ host: config.rotronHost, name: 'Moviem', })
  .use(sagaPlugin({}))
  .use(reactotronRedux({}))
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    // Netinfo Ping urlsini engelliyoruz
    networking: {ignoreUrls: /generate_204/},
    // Asenkron olaylarını engelliyoruz
    asyncStorage: {ignore: ['persist:root']},
  })
  .connect();

// Başlangıçta reactotronu temizliyoruz.
Reactotron.clear && Reactotron.clear();

// Reactotron konsolunu etkinleştiriyoruz
declare global {
  interface Console {
    tron: typeof reactotron;
  }
}

console.tron = reactotron;
