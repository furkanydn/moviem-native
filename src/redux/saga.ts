import {SagaIterator} from 'redux-saga';
import {all, fork, takeEvery, takeLatest} from 'redux-saga/effects';
//
import * as authConst from './auth/constants';
import * as authSaga from './auth/saga';
import * as exploreConst from './explore/constants';
import * as exploreSaga from './explore/saga';
import * as movieConst from './movies/constants';
import * as movieSaga from './movies/saga';
import * as networkConst from './network/constants';
import * as networkSaga from './network/saga';
import * as searchConst from './search/constants';
import * as searchSaga from './search/saga';
import * as sectionConst from './sections/constants';
import * as sectionSaga from './sections/saga';
import * as rehydConst from './rehydrate/constants';
import * as rehydSaga from './rehydrate/saga';

// Saga
export function* rootSaga(): SagaIterator {
  yield all([
    // Doğrulama Etkileşimleri
    takeLatest(
      authConst.CREATE_AUTHENTICATED_SESSION_REQUEST,
      authSaga.createAuthSessionSaga,
    ),
    takeLatest(
      authConst.CREATE_GUEST_SESSION_REQUEST,
      authSaga.createGuestSessionSaga,
    ),
    takeLatest(authConst.LOG_OUT, authSaga.logOutSaga),

    // Gezinme-Keşfetme Etkileşimleri
    fork(exploreSaga.resolveActionQueueSaga),
    fork(exploreSaga.preloadExploreImageSaga),
    takeLatest(
      exploreConst.EXPLORE_MOVIE_SWIPED,
      exploreSaga.exploreMoviesLoadRequestSaga,
    ),
    takeLatest(
      exploreConst.EXPLORE_MOVIES_LOAD_REQUEST,
      exploreSaga.exploreMoviesLoadRequestSaga,
    ),
    takeLatest(
      exploreConst.EXPLORE_MOVIES_LOAD,
      exploreSaga.exploreMoviesLoadSaga,
    ),
    takeLatest(
      exploreConst.EXPLORE_MOVIES_LOAD_SUCCESS,
      exploreSaga.movieSwiped,
    ),

    // Film Etkileşimleri
    takeEvery(
      movieConst.FETCH_DETAILED_MOVIE_REQUEST,
      movieSaga.fetchDetailedMovieSaga,
    ),
    takeEvery(
      movieConst.FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
      movieSaga.fetchMovieRecommendSaga,
    ),
    takeEvery(
      movieConst.FETCH_MOVIE_ACCOUNT_STATE_REQUEST,
      movieSaga.fetchMovieAccountStateSaga,
    ),
    takeEvery(
      movieConst.CHANGE_MOVIE_STATUS_REQUEST,
      movieSaga.changeMovieStatusSaga,
    ),

    // Ağ Etkileşimleri
    fork(networkSaga.resolveFailedRequestSaga),
    takeLatest(
      networkConst.START_NETWORK_MONITORING,
      networkSaga.startNetworkMonitorSaga,
    ),
    takeLatest(
      networkConst.STOP_NETWORK_MONITORING,
      networkSaga.stopNetworkMonitorSaga,
    ),
    takeLatest(
      networkConst.HANDLE_NETWORK_REDUX_ERROR,
      networkSaga.handleNetworkReduxErrorSaga,
    ),

    //  Statik HTML Etkileşimleri
    takeLatest(rehydConst.AFTER_REHYDRATE, rehydSaga.afterRehydrateSaga),

    // Arama Etkileşimleri
    takeLatest(
      searchConst.SEARCH_TEXT_CHANGED,
      searchSaga.searchTextChangeSaga,
    ),
    takeLatest(
      searchConst.CLEAR_SEARCH_RESULTS,
      searchSaga.clearSearchResultSaga,
    ),
    takeLatest(searchConst.SEARCH_MOVIES_REQUEST, searchSaga.searchMoviesSaga),
    takeLatest(
      searchConst.SEARCH_MOVIES_PAGINATION_REQUEST,
      searchSaga.searchMoviePageRequestSaga,
    ),
    takeLatest(
      searchConst.SEARCH_MOVIES_PAGINATION_FETCH,
      searchSaga.searchMoviePageFetchSaga,

    // Bölüm Etkileşimleri
    takeEvery(
      sectionConst.REFRESH_SECTION_REQUEST,
      sectionSaga.refreshSectionRequestSaga,
    ),
    takeEvery(
      sectionConst.FETCH_SECTION_NEXT_PAGE,
      sectionSaga.fetchSectionNextPageSaga,
    ),
    takeEvery(
      sectionConst.FETCH_SECTION_NEXT_PAGE_REQUEST,
      sectionSaga.fetchSectionNextPageRequestSaga,
    ),
  ]);
}
