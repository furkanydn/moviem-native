import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
//
import {reactotron} from '../config/reactotron';
import {rootReducer} from './reducer';
import {afterRehyd} from './rehydrate/action';
import {rootSaga} from './saga';
import storeService from './storeService';

//
const MID = [];
let sagaMonitor;

// Reactotron
if (__DEV__) {
  if (reactotron.createSagaMonitor) {
    sagaMonitor = reactotron.createSagaMonitor();
  }
  reactotron.createEnhancer && MID.push(reactotron.createEnhancer());
}

// Redux SAGA
const sagaMID = createSagaMiddleware({sagaMonitor});
MID.push(applyMiddleware(sagaMID));

// Redux
export const store = createStore(rootReducer, {}, composeWithDevTools(...MID));
export const persistor = persistStore(store, {}, () =>
  store.dispatch(afterRehyd()),
);

storeService.setStoreServiceRef(store);

//
sagaMID && sagaMID.run(rootSaga);
