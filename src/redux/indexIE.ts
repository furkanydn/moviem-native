import {Movie, MovieID} from './movies/type';
import {SocialAction} from './explore/type';

import {AuthAction} from './auth/action';
import {Explore} from './explore/action';
import {Movies} from './movies/action';
import {Search} from './search/action';
import {NetworkActions} from './network/action';

import authReducer from './auth/reducer';
import exploreReducer from './explore/reducer';
import movieReducer from './movies/reducer';
import searchReducer from './search/reducer';

import {AfterRehydrate} from './rehydrate/action';
import {AFTER_REHYDRATE} from './rehydrate/constants';

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
  AfterRehydrate,
  //Constants
  AFTER_REHYDRATE,
  // Reducers
  authReducer,
  exploreReducer,
  movieReducer,
  searchReducer,
};
