import {uniq} from 'lodash';
import moment from 'moment';
import {MovieID} from '../indexIE';
import * as searchConst from './constants';
import {
  Search,
  SearchMovieRequest,
  SearchMovieRequestSlow,
  SearchMovieSuccess,
  SearchMoviePageFetch,
  SearchMoviePageSuccess,
  SearchTextChange,
} from './action';

// Durum Bileşenleri
export const initState = {
  searchText: '',
  currentPage: 1,
  debouncePending: false,
  movieIDs: [] as MovieID[],
  searchRequestPending: false,
  requestSlow: false,
  paginationPending: false,
  lastPage: false,
  lastUpdate: undefined as string | undefined,
};

type SearchStateType = typeof initState;
export interface SearchState extends SearchStateType {}

// Bileşenleri Döndüren Fonksiyonlar
const searchMovieRequest = (
  state: SearchState,
  {}: SearchMovieRequest,
): SearchState => ({
  ...state,
  debouncePending: false,
  requestSlow: false,
  searchRequestPending: true,
});

const searchMovieRequestSlow = (
  state: SearchState,
  {}: SearchMovieRequestSlow,
): SearchState => ({...state, requestSlow: true});

const searchMovieSuccess = (
  state: SearchState,
  action: SearchMovieSuccess,
): SearchState => ({
  ...state,
  movieIDs: action.movieIDs,
  currentPage: 1,
  searchRequestPending: false,
  requestSlow: false,
  paginationPending: false,
  lastPage: action.lastPage,
  lastUpdate: moment().format(),
});

const searchMoviePageFetch = (
  state: SearchState,
  {}: SearchMoviePageFetch,
): SearchState => {
  const {lastPage, paginationPending} = state;
  if (lastPage || paginationPending) {
    return state;
  }

  return {...state, paginationPending: true};
};

const searchMoviePageSuccess = (
  state: SearchState,
  action: SearchMoviePageSuccess,
): SearchState => ({
  ...state,
  currentPage: state.currentPage + 1,
  paginationPending: false,
  movieIDs: uniq([...state.movieIDs, ...action.movieIDs]),
  lastPage: action.lastPage,
  lastUpdate: moment().format(),
});

const searchTextChange = (
  state: SearchState,
  action: SearchTextChange,
): SearchState => ({
  ...state,
  debouncePending: true,
  searchText: action.query,
});

const clearSearchResult = (): SearchState => ({
  ...initState,
  lastUpdate: moment().format(),
});

const searchReducer = (
  state: SearchState | undefined = initState,
  action: Search,
): SearchState => {
  switch (action.type) {
    case searchConst.SEARCH_MOVIES_REQUEST:
      return searchMovieRequest(state, action);
    case searchConst.SEARCH_MOVIES_REQUEST_SLOW:
      return searchMovieRequestSlow(state, action);
    case searchConst.SEARCH_MOVIES_SUCCESS:
      return searchMovieSuccess(state, action);
    case searchConst.SEARCH_MOVIES_PAGINATION_FETCH:
      return searchMoviePageFetch(state, action);
    case searchConst.SEARCH_MOVIES_PAGINATION_SUCCESS:
      return searchMoviePageSuccess(state, action);
    case searchConst.SEARCH_TEXT_CHANGED:
      return searchTextChange(state, action);
    case searchConst.CLEAR_SEARCH_RESULTS:
      return clearSearchResult();
    default:
      return state;
  }
};

export default searchReducer;
