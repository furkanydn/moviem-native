import Reactotron from 'reactotron-react-native';
import {persistor} from '../redux/store';
import NavigationService from '../routes/navigationService';
import {routeName} from '../routes/routeName';

// Reactotron Komutları
Reactotron.onCustomCommand({
  command: 'Reset store',
  handler: async () => {
    await persistor.purge();
    NavigationService.navigate(routeName.AuthStack);
  },
  description: 'Reset store and navigate',
});
