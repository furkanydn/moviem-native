import {MovieAPIDetailed} from '../../api/type';
import {WithCallback} from '../type';
import {Movie, MovieID, MovieIDParam, MovieStatusType} from './type';
import * as movieConst from './constants';

// Farklı Bir Tipte Gelirse
interface ChangeMovieStatusParams {
  movieID: MovieID;
  statusType: MovieStatusType;
  status: boolean;
}
// Bileşenlerin Hazırlanması
export const addMovie = (movies: Movie) =>
  <const>{type: movieConst.ADD_MOVIES, movies};

export const fetchMovieAccountStateRequest = (
  params: MovieIDParam & WithCallback,
) =>
  <const>{
    type: movieConst.FETCH_MOVIE_ACCOUNT_STATE_REQUEST,
    ...params,
  };

export const fetchMovieAccountStateSuccess = (
  params: MovieIDParam & {favorite: boolean; watchlist: boolean},
) =>
  <const>{
    type: movieConst.FETCH_MOVIE_ACCOUNT_STATE_SUCCESS,
    ...params,
  };

export const fetchMovieDetailedRequest = (
  params: MovieIDParam & WithCallback,
) =>
  <const>{
    type: movieConst.FETCH_DETAILED_MOVIE_REQUEST,
    ...params,
  };

export const fetchMovieDetailedSuccess = (
  params: MovieIDParam & {movieDetailed: MovieAPIDetailed},
) =>
  <const>{
    type: movieConst.FETCH_DETAILED_MOVIE_SUCCESS,
    ...params,
  };

export const fetchMovieRecommendationsRequest = (
  params: MovieIDParam & WithCallback,
) =>
  <const>{
    type: movieConst.FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
    ...params,
  };

export const fetchMovieRecommendationsSuccess = (
  params: MovieIDParam & {recommendMovieIDs: MovieID[]},
) =>
  <const>{
    type: movieConst.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
    ...params,
  };

// Farklı Tipte Gelenlerin Bileşenlerinin Hazırlanması
export const changeMovieStatusRequest = (
  params: ChangeMovieStatusParams & WithCallback,
) =>
  <const>{
    type: movieConst.CHANGE_MOVIE_STATUS_REQUEST,
    ...params,
  };

export const changeMovieStatusSuccess = (params: ChangeMovieStatusParams) =>
  <const>{
    type: movieConst.CHANGE_MOVIE_STATUS_SUCCESS,
    ...params,
  };

export const changeMovieStatusFail = (
  params: ChangeMovieStatusParams & WithCallback,
) =>
  <const>{
    type: movieConst.CHANGE_MOVIE_STATUS_FAILURE,
    ...params,
  };

// Gelen Veri Dizisinde Kullanılmayacak Verilerin Ayrılması İçin Bileşen
export const filterUnusedMovieData = (params: {movieIDs: MovieID[]}) =>
  <const>{type: movieConst.FILTER_UNUSED_MOVIE_DATA, ...params};

// Dışarı Aktarılacak Bileşenler
export interface AddMovie extends ReturnType<typeof addMovie> {}

export interface FetchMovieAccountStateRequest
  extends ReturnType<typeof fetchMovieAccountStateRequest> {}
export interface FetchMovieAccountStateSuccess
  extends ReturnType<typeof fetchMovieAccountStateSuccess> {}

export interface FetchMovieDetailedRequest
  extends ReturnType<typeof fetchMovieDetailedRequest> {}
export interface FetchMovieDetailedSuccess
  extends ReturnType<typeof fetchMovieDetailedSuccess> {}

export interface FetchMovieRecommendationRequest
  extends ReturnType<typeof fetchMovieRecommendationsRequest> {}
export interface FetchMovieRecommendationSuccess
  extends ReturnType<typeof fetchMovieRecommendationsSuccess> {}

export interface ChangeMovieStatusRequest
  extends ReturnType<typeof changeMovieStatusFail> {}
export interface ChangeMovieStatusSuccess
  extends ReturnType<typeof changeMovieStatusSuccess> {}
export interface ChangeMovieStatusFail
  extends ReturnType<typeof changeMovieStatusFail> {}

export interface FilterUnusedMovieData
  extends ReturnType<typeof filterUnusedMovieData> {}

// Hazırlanan Bileşenlerin Kalıtımla Erişim Bileşenleştirilmesi
export type Movies =
  | AddMovie
  | FetchMovieAccountStateRequest
  | FetchMovieAccountStateSuccess
  | FetchMovieDetailedRequest
  | FetchMovieDetailedSuccess
  | FetchMovieRecommendationRequest
  | FetchMovieRecommendationSuccess
  | FilterUnusedMovieData
  | ChangeMovieStatusRequest
  | ChangeMovieStatusSuccess
  | ChangeMovieStatusFail;
