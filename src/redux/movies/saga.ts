import {AxiosResponse} from 'axios';
import {call, put, select} from 'redux-saga/effects';
import {
  changeMovieStatusAPI,
  getMovieAccountStateAPI,
  GetMovieAccountStateApiResponse,
  getMovieDetailAPI,
  getMovieRecommendationsAPI,
  MovieListApiResponse,
} from '../../api/movies';
import {MovieAPIDetailed, UserIDParams} from '../../api/type';
import {userIDParamsSelect} from '../auth/selector';
import {handleNetworkReduxError} from '../network/action';
import {
  changeMovieStatusFail,
  ChangeMovieStatusRequest,
  changeMovieStatusSuccess,
  FetchMovieDetailedRequest,
  fetchMovieDetailedSuccess,
  FetchMovieAccountStateRequest,
  fetchMovieAccountStateSuccess,
  FetchMovieRecommendationRequest,
  fetchMovieRecommendationsSuccess,
} from './action';
import {normalizeAndAddMovie} from './helper';

// Yardımcı Nesneler
export function* fetchDetailedMovieSaga(action: FetchMovieDetailedRequest) {
  const {movieID, oError, oSuccess} = action;

  try {
    const {data}: AxiosResponse<MovieAPIDetailed> = yield call(
      getMovieDetailAPI,
      {
        movieID,
      },
    );
    yield put(fetchMovieDetailedSuccess({movieID, movieDetailed: data}));
    oSuccess && oSuccess();
  } catch (e) {
    oError && oError();
    yield put(handleNetworkReduxError(e, action));
  }
}

export function* fetchMovieAccountStateSaga(
  action: FetchMovieAccountStateRequest,
) {
  const {movieID, oError, oSuccess} = action;

  try {
    const userIDs: UserIDParams = yield select(userIDParamsSelect);
    const {
      data: {favorite, watchlist},
    }: AxiosResponse<GetMovieAccountStateApiResponse> = yield call(
      getMovieAccountStateAPI,
      {
        movieID,
        ...userIDs,
      },
    );

    yield put(fetchMovieAccountStateSuccess({movieID, favorite, watchlist}));
    oSuccess && oSuccess();
  } catch (e) {
    oError && oError();
    yield put(handleNetworkReduxError(e, action));
  }
}

export function* fetchMovieRecommendSaga(
  action: FetchMovieRecommendationRequest,
) {
  const {movieID, oError, oSuccess} = action;

  try {
    const {data}: AxiosResponse<MovieListApiResponse> = yield call(
      getMovieRecommendationsAPI,
      {
        movieID,
        page: 1,
      },
    );
    const {movieIDs} = normalizeAndAddMovie(data.results);

    yield put(
      fetchMovieRecommendationsSuccess({movieID, recommendMovieIDs: movieIDs}),
    );
    oSuccess && oSuccess();
  } catch (e) {
    oError && oError();
    yield put(handleNetworkReduxError(e, action));
  }
}

export function* changeMovieStatusSaga({
  movieID,
  status,
  statusType,
  oSuccess,
  oError,
}: ChangeMovieStatusRequest) {
  try {
    const userIDs: UserIDParams = yield select(userIDParamsSelect);
    yield call(changeMovieStatusAPI, {movieID, statusType, status, ...userIDs});
    yield put(changeMovieStatusSuccess({movieID, statusType, status}));
    oSuccess && oSuccess();
  } catch (e) {
    yield put(changeMovieStatusFail({movieID, statusType, status}));
    oError && oError();
  }
}
