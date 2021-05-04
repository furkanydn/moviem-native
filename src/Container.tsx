import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Application from './Application';
import {store, persistor} from './redux/store';

const Container: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <Application />
    </PersistGate>
  </Provider>
);

export default Container;
