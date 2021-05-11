import AsyncStorage from '@react-native-async-storage/async-storage';
import {mapValues} from 'lodash';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {PersistPartial} from 'redux-persist/es/persistReducer';

import {
  authReducer,
  exploreReducer,
  movieReducer,
  networkReducer,
  searchReducer,
  sectionReducer,
} from './indexIE';
import {RootAction, RootState} from './type';

// Bileşenler
const reducers = {
  auth: authReducer,
  explore: exploreReducer,
  movies: movieReducer,
  network: networkReducer,
  search: searchReducer,
  sections: sectionReducer,
};

const combineReducer = combineReducers(reducers);

// Bileşen Anahtarı
type ReducerKey = keyof typeof reducers | keyof PersistPartial;

// Kalıcı Bileşenler
const configuration = {
  storage: AsyncStorage,
  version: 2,
  key: 'root',
  whitelist: ['auth', 'explore', 'movies'],
};

export const persistedReducer = persistReducer(configuration, combineReducer);

// Oturum Kapatma Bileşeni
// Oturumu kapattıktan sonra temizlenmeyen alt dosyaların listesidir
const persistReducerAfterLogOutKeys: Partial<ReducerKey>[] = [
  'network',
  '_persist',
];

const logOutReducer = (
  inputState: RootState,
  action: RootAction,
): RootState => {
  const isLogOutAct = action.type === 'auth/LOG_OUT';

  if (!isLogOutAct) {
    return inputState;
  }

  const state = mapValues(inputState, (reducer, key: ReducerKey) => {
    const persistReduce = persistReducerAfterLogOutKeys.includes(key);

    return persistReduce ? reducer : undefined;
  });

  return (state as unknown) as RootState;
};

// Ana Bileşen
export const rootReducer = (inputState: RootState, action: RootAction) => {
  const state = logOutReducer(inputState, action);

  return persistedReducer(state, action);
};
