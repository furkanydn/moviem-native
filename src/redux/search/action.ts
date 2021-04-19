import moment from 'moment';
import * as searchConst from './constants';
import {MovieID} from '../movies/type';

// Bileşenlerin Hazırlanması
export const searchTextChange = (query: string) =>
  <const>{type: searchConst.SEARCH_TEXT_CHANGED, query};
export const clearSearchResult = () =>
  <const>{type: searchConst.CLEAR_SEARCH_RESULTS};

export const searchMovieRequest = () =>
  <const>{type: searchConst.SEARCH_MOVIES_REQUEST};
export const searchMovieRequestSlow = () =>
  <const>{type: searchConst.SEARCH_MOVIES_REQUEST_SLOW};
export const searchMovieSuccess = (movieIDs: MovieID[], lastPage: boolean) =>
  <const>{
    type: searchConst.SEARCH_MOVIES_SUCCESS,
    movieIDs,
    lastPage,
  };

export const searchMoviePageRequest = () =>
  <const>{type: searchConst.SEARCH_MOVIES_PAGINATION_REQUEST};
export const searchMoviePageSuccess = (
  movieIDs: MovieID[],
  lastPage: boolean,
) =>
  <const>{
    type: searchConst.SEARCH_MOVIES_PAGINATION_SUCCESS,
    movieIDs,
    lastPage,
  };
export const searchMoviePageFetch = () =>
  <const>{
    type: searchConst.SEARCH_MOVIES_PAGINATION_FETCH,
    requestTime: moment(),
  };

// Dışarı Aktarılacak Bileşenler
export type SearchTextChange = ReturnType<typeof searchTextChange>;
export type ClearSearchResult = ReturnType<typeof clearSearchResult>;

export type SearchMovieRequest = ReturnType<typeof searchMovieRequest>;
export type SearchMovieRequestSlow = ReturnType<typeof searchMovieRequestSlow>;
export type SearchMovieSuccess = ReturnType<typeof searchMovieSuccess>;

export type SearchMoviePageRequest = ReturnType<typeof searchMoviePageRequest>;
export type SearchMoviePageSuccess = ReturnType<typeof searchMoviePageSuccess>;
export type SearchMoviePageFetch = ReturnType<typeof searchMoviePageFetch>;

// Hazırlanan Bileşenlerin Dışarı Aktarılması
export type Search =
  | SearchTextChange
  | ClearSearchResult
  | SearchMovieRequest
  | SearchMovieRequestSlow
  | SearchMovieSuccess
  | SearchMoviePageRequest
  | SearchMoviePageSuccess
  | SearchMoviePageFetch;
