import {AxiosResponse} from 'axios';
import {call, delay, fork, put, race, select, take} from 'redux-saga/effects';
import {
  getMoviesBySearchQueryAPI,
  MovieListApiResponse,
} from '../../api/movies';
import {lastMovieList} from '../../utils/movie';
import {normalizeAndAddMovie} from '../movies/helper';
import {
  clearReduxActionFromQueue,
  handleNetworkReduxError,
} from '../network/action';
import {
  ClearSearchResult,
  clearSearchResult,
  SearchMoviePageFetch,
  searchMoviePageFetch,
  SearchMoviePageRequest,
  searchMoviePageSuccess,
  SearchMovieRequest,
  searchMovieRequest,
  searchMovieRequestSlow,
  searchMovieSuccess,
  SearchTextChange,
} from './action';
import {
  SEARCH_MOVIES_PAGINATION_FETCH,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_TEXT_CHANGED,
} from './constants';
import {
  searchPagePendingSelect,
  searchCurrentPageSelect,
  searchLastUpdateSelect,
  searchTextSelect,
} from './selector';

// Yardımcı Nesneler
export function* searchTextChangeSaga({query}: SearchTextChange) {
  if (query.length === 0) {
    yield put(clearSearchResult());
    return;
  }
  const searchDebTime = 500;
  yield delay(searchDebTime);
  yield put(searchMovieRequest());
}

export function* clearSearchResultSaga({}: ClearSearchResult) {
  yield put(
    clearReduxActionFromQueue([
      SEARCH_MOVIES_REQUEST,
      SEARCH_MOVIES_PAGINATION_FETCH,
    ]),
  );
}

export function* searchMoviesSaga(action: SearchMovieRequest) {
  try {
    const query: string = yield select(searchTextSelect);
    if (query.length === 0) {
      return;
    }
    yield fork(checkSlowSearchRequestSaga);
    const {
      data,
    }: AxiosResponse<MovieListApiResponse> = yield call(
      getMoviesBySearchQueryAPI,
      {page: 1, query},
    );
    const {movieIDs} = normalizeAndAddMovie(data.result);
    yield put(searchMovieSuccess(movieIDs, lastMovieList(data)));
  } catch (e) {
    yield put(
      handleNetworkReduxError(e, action, {
        clearActionFromQueue: SEARCH_MOVIES_PAGINATION_FETCH,
      }),
    );
  }
}

function* checkSlowSearchRequestSaga() {
  const [isDelay] = yield race([
    delay(2000),
    take(SEARCH_TEXT_CHANGED),
    take(SEARCH_MOVIES_SUCCESS),
  ]);
  if (isDelay) {
    yield put(searchMovieRequestSlow());
  }
}

export function* searchMoviePageRequestSaga({}: SearchMoviePageRequest) {
  const isSearchPen: boolean = yield select(searchPagePendingSelect);
  if (isSearchPen) {
    return;
  }
  yield put(searchMoviePageFetch());
}

export function* searchMoviePageFetchSaga(action: SearchMoviePageFetch) {
  try {
    const {requestTime} = action;
    const query: string = yield select(searchTextSelect);
    if (query.length === 0) {
      return;
    }
    const currentPage: number = yield select(searchCurrentPageSelect);
    const {
      data,
    }: AxiosResponse<MovieListApiResponse> = yield call(
      getMoviesBySearchQueryAPI,
      {page: currentPage + 1, query},
    );
    const lastUpdated: string = yield select(searchLastUpdateSelect);
    const isRevUpdate = requestTime.isAfter(lastUpdated);
    if (isRevUpdate) {
      const {movieIDs} = normalizeAndAddMovie(data.result);
      yield put(searchMoviePageSuccess(movieIDs, lastMovieList(data)));
    }
  } catch (e) {
    yield put(handleNetworkReduxError(e, action));
  }
}
