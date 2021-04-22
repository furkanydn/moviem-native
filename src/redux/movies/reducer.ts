import {keyBy, pickBy} from 'lodash';
import * as movieConst from './constants';
import {Movie, MovieID} from './type';
import {
  AddMovie,
  ChangeMovieStatusRequest,
  ChangeMovieStatusSuccess,
  ChangeMovieStatusFail,
  FetchMovieDetailedRequest,
  FetchMovieDetailedSuccess,
  FetchMovieRecommendationRequest,
  FetchMovieRecommendationSuccess,
  FetchMovieAccountStateRequest,
  FetchMovieAccountStateSuccess,
  FilterUnusedMovieData,
  Movies,
} from './action';

//Durum Bileşenleri
export const initState = {} as Record<MovieID, Movie>;
type MovieType = typeof initState;
export interface MovieState extends MovieType {}

// Bileşenleri Döndüren Fonksiyonlar
const addMovie = (state: MovieState, action: AddMovie): MovieState => {
  const {movies} = action;
  const movieNoDuplicate = movies.filter(movie => !state[movie.id]);
  const movieMapByID = keyBy(movieNoDuplicate, movie => movie.id);

  return {...state, ...movieMapByID};
};

const changeMovieStatusRequest = (
  state: MovieState,
  action: ChangeMovieStatusRequest,
): MovieState => {
  const {movieID, status, statusType} = action;
  const movie = state[movieID];

  return {
    ...state,
    [movieID]:
      statusType === 'favorite'
        ? {...movie, isFavoritePending: true, isInFavorite: status}
        : {...movie, isWatchListPending: true, isInWatchList: status},
  };
};

const changeMovieStatusSuccess = (
  state: MovieState,
  action: ChangeMovieStatusSuccess,
): MovieState => {
  const {movieID, status, statusType} = action;
  const movie = state[movieID];

  return {
    ...state,
    [movieID]:
      statusType === 'favorite'
        ? {...movie, isFavoritePending: false, isInFavorite: status}
        : {...movie, isWatchListPending: false, isInWatchList: status},
  };
};

const changeMovieStatusFail = (
  state: MovieState,
  action: ChangeMovieStatusFail,
): MovieState => {
  const {movieID, status, statusType} = action;
  const movie = state[movieID];

  return {
    ...state,
    [movieID]:
      statusType === 'favorite'
        ? {...movie, isFavoritePending: false, isInFavorite: !status}
        : {...movie, isWatchListPending: false, isInWatchList: !status},
  };
};

const fetchMovieDetailedRequest = (
  state: MovieState,
  {}: FetchMovieDetailedRequest,
): MovieState => ({...state});

const fetchMovieDetailedSuccess = (
  state: MovieState,
  action: FetchMovieDetailedSuccess,
): MovieState => {
  const {movieID, movieDetailed} = action;
  const movie = state[movieID];
  return {...state, [movieID]: {...movie, movieDetailed}};
};

const fetchMovieRecommendationRequest = (
  state: MovieState,
  {}: FetchMovieRecommendationRequest,
): MovieState => ({...state});

const fetchMovieRecommendationSuccess = (
  state: MovieState,
  action: FetchMovieRecommendationSuccess,
): MovieState => {
  const {movieID, recommendMovieIDs} = action;
  const movie = state[movieID];

  return {...state, [movieID]: {...movie, recommendations: recommendMovieIDs}};
};

const fetchMovieAccountStateRequest = (
  state: MovieState,
  {}: FetchMovieAccountStateRequest,
): MovieState => ({...state});

const fetchMovieAccountStateSuccess = (
  state: MovieState,
  action: FetchMovieAccountStateSuccess,
): MovieState => {
  const {favorite, movieID, watchlist} = action;
  const movie = state[movieID];
  return {
    ...state,
    [movieID]: {...movie, isInFavorite: favorite, isInWatchList: watchlist},
  };
};

const filterUnusedData = (
  state: MovieState,
  action: FilterUnusedMovieData,
): MovieState => {
  const {movieIDs: proceedMovieIDs} = action;
  const filtered = pickBy(state, movie => proceedMovieIDs.includes(movie.id));

  return filtered;
};

const movieReducer = (
  state: MovieState | undefined = initState,
  action: Movies,
): MovieState => {
  switch (action.type as any) {
    case movieConst.ADD_MOVIES:
      return addMovie(state, action);

    case movieConst.CHANGE_MOVIE_STATUS_REQUEST:
      return changeMovieStatusRequest(state, action);
    case movieConst.CHANGE_MOVIE_STATUS_SUCCESS:
      return changeMovieStatusSuccess(state, action);
    case movieConst.CHANGE_MOVIE_STATUS_FAILURE:
      return changeMovieStatusFail(state, action);

    case movieConst.FETCH_DETAILED_MOVIE_REQUEST:
      return fetchMovieDetailedRequest(state, action);
    case movieConst.FETCH_DETAILED_MOVIE_SUCCESS:
      return fetchMovieDetailedSuccess(state, action);
    case movieConst.FETCH_MOVIE_RECOMMENDATIONS_REQUEST:
      return fetchMovieRecommendationRequest(state, action);
    case movieConst.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS:
      return fetchMovieRecommendationSuccess(state, action);
    case movieConst.FETCH_MOVIE_ACCOUNT_STATE_REQUEST:
      return fetchMovieAccountStateRequest(state, action);
    case movieConst.FETCH_MOVIE_ACCOUNT_STATE_SUCCESS:
      return fetchMovieAccountStateSuccess(state, action);

    case movieConst.FILTER_UNUSED_MOVIE_DATA:
      return filterUnusedData(state, action);
    default:
      return state;
  }
};

export default movieReducer;
