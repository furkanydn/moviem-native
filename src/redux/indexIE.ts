import {Movie, MovieID} from './movies/type';
import {SocialAction} from './explore/type';

import {AuthAction} from './auth/action';
import {Explore} from './explore/action';
import {Movies} from './movies/action';
import {Search} from './search/action';
import {NetworkActions} from './network/action';
import {Rehydrates} from './rehydrate/action';
import {SectionAction} from './sections/action';

import authReducer from './auth/reducer';
import exploreReducer from './explore/reducer';
import movieReducer from './movies/reducer';
import searchReducer from './search/reducer';
import networkReducer from './network/reducer';
import {persistedReducer} from './reducer';

import {AfterRehydrate} from './rehydrate/action';
import {AFTER_REHYDRATE} from './rehydrate/constants';

import {isNetworkError, isServerError} from '../utils/network';

// For reducer
export {
  // Type
  Movie,
  MovieID,
  // Actions
  SocialAction,
  AuthAction,
  Explore,
  Movies,
  Search,
  NetworkActions,
  Rehydrates,
  AfterRehydrate,
  SectionAction,
  //Constants
  AFTER_REHYDRATE,
  // Reducers
  authReducer,
  exploreReducer,
  movieReducer,
  searchReducer,
  networkReducer,
  persistedReducer,
  // Network Utils
  isNetworkError,
  isServerError,
};
