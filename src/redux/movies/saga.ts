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
  const {movieID, Error, Success} = action;

  try {
    const {data}: AxiosResponse<MovieAPIDetailed> = yield call(
      getMovieDetailAPI,
      {
        movieID,
      },
    );
    yield put(fetchMovieDetailedSuccess({movieID, movieDetailed: data}));
    Success && Success();
  } catch (e) {
    Error && Error();
    yield put(handleNetworkReduxError(e, action));
  }
}

export function* fetchMovieAccountStateSaga(
  action: FetchMovieAccountStateRequest,
) {
  const {movieID, Error, Success} = action;

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

    yield put(fetchMovieAccountStateSuccess({movieID, favorite, watchlist}));
    Success && Success();
  } catch (e) {
    Error && Error();
    yield put(handleNetworkReduxError(e, action));
  }
}

export function* fetchMovieRecommendSaga(action: FetchMovieRecommendationRequest) {
  const {movieID,Error,Success} = action;

  try {
    const {data}: AxiosResponse<MovieListApiResponse> = yield call(getMovieRecommendationsAPI,{
      movieID,
      page: 1,
    });
    const {movieIDs} = normalizeAndAddMovie(data.result);

    yield put(fetchMovieRecommendationsSuccess({movieID,recommendMovieIDs: movieIDs}));
    Success && Success();
  } catch (e) {
    Error && Error();
    yield put(handleNetworkReduxError(e,action));
  }
}

export function* changeMovieStatusSaga({movieID,status,statusType,onSuccess,onError}:ChangeMovieStatusRequest) {
  try {
    const userIDs: UserIDParams = yield select(userIDParamsSelect);
    yield call(changeMovieStatusAPI,{movieID,statusType,status,...userIDs});
    yield put(changeMovieStatusSuccess({movieID,statusType,status}));
    onSuccess && onSuccess();
  } catch (e) {
    yield put(changeMovieStatusFail({movieID,statusType,status}));
    onError && onError();
  }
}
