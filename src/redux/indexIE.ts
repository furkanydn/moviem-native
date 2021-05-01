import {
  Movie,
  MovieID,
  MovieRequiredPropKey,
  MovieStoreProps,
  NormalizeMovieProps,
  ParsedMovie,
} from './movies/type';
import {SocialAction} from './explore/type';
import {RootState, RootAction} from './type';

import {AuthAction} from './auth/action';
import {
  Explore,
  exploreLoadRequest,
  exploreLoadSuccess,
  exploreResolved,
  exploreSwiped,
  exploreMovieLoad,
  explorePosterLoaded,
} from './explore/action';
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
import sectionReducer from './sections/reducer';
import {persistedReducer} from './reducer';

import {AfterRehydrate} from './rehydrate/action';
import {AFTER_REHYDRATE} from './rehydrate/constants';

import {isNetworkError, isServerError} from '../utils/network';

import {
  refreshSectionRequest,
  refreshSectionSuccess,
  fetchSectionNextPageRequest,
} from './sections/action';
import {browseSectionKey} from './sections/sectionData';
import {SectionKeys} from './sections/type';
import {sectionData} from './sections/sectionData';
import {getSectionSelectByKey} from './sections/selector';

import {
  networkConnectedSelect,
  isInternetReachableSelect,
  networkIpAddressSelect,
  failedNetworkRequestQueueSelect,
} from './network/selector';

import {getMovieSelectByID} from './movies/selector';

import {
  changeMovieStatusRequest,
  changeMovieStatusSuccess,
  changeMovieStatusFail,
  fetchMovieDetailedRequest,
  fetchMovieDetailedSuccess,
  fetchMovieAccountStateRequest,
  fetchMovieAccountStateSuccess,
  fetchMovieRecommendationsRequest,
  fetchMovieRecommendationsSuccess,
} from './movies/action';

import {
  isGuestUserSelect,
  isAuthUserSelect,
  accountIDSelect,
  userIDParamsSelect,
  createGuestSessionPendingSelect,
  createAuthSessionErrorSelect,
  createAuthSessionPendingSelect,
  sessionIDSelect,
  createGuestSessionErrorSelect,
} from './auth/selector';

import {
  exploreStateSelect,
  exploreMovieIdsSelect,
  loadPosterMovieSelect,
  exploreMovieLoadPosterSelect,
  exploredSeenMapSelect,
  exploredActionQueueSelect,
  isExploreLoadSelect,
} from './explore/selector';

// For reducer
export {
  // Type
  Movie,
  MovieID,
  RootState,
  RootAction,
  MovieRequiredPropKey,
  MovieStoreProps,
  NormalizeMovieProps,
  ParsedMovie,
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
  //Subactions
  changeMovieStatusRequest,
  changeMovieStatusSuccess,
  changeMovieStatusFail,
  //Constants
  AFTER_REHYDRATE,
  // Reducers
  authReducer,
  exploreReducer,
  movieReducer,
  searchReducer,
  networkReducer,
  sectionReducer,
  persistedReducer,
  // Network Utils
  isNetworkError,
  isServerError,
  // Network Selectors
  networkConnectedSelect,
  isInternetReachableSelect,
  networkIpAddressSelect,
  failedNetworkRequestQueueSelect,
  //
  refreshSectionRequest,
  refreshSectionSuccess,
  fetchSectionNextPageRequest,
  //
  browseSectionKey,
  SectionKeys,
  sectionData,
  getSectionSelectByKey,
  getMovieSelectByID,
  isGuestUserSelect,
  isAuthUserSelect,
  accountIDSelect,
  userIDParamsSelect,
  createGuestSessionPendingSelect,
  createAuthSessionErrorSelect,
  createAuthSessionPendingSelect,
  sessionIDSelect,
  createGuestSessionErrorSelect,
  fetchMovieDetailedRequest,
  fetchMovieDetailedSuccess,
  fetchMovieAccountStateRequest,
  fetchMovieAccountStateSuccess,
  fetchMovieRecommendationsRequest,
  fetchMovieRecommendationsSuccess,
  //
  exploreLoadRequest,
  exploreLoadSuccess,
  exploreSwiped,
  exploreResolved,
  exploreMovieLoad,
  explorePosterLoaded,
  //
  exploreStateSelect,
  exploreMovieIdsSelect,
  loadPosterMovieSelect,
  exploreMovieLoadPosterSelect,
  exploredSeenMapSelect,
  exploredActionQueueSelect,
  isExploreLoadSelect,
};
