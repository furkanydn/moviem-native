import {createSelector} from 'reselect';
import {RootState} from '../type';

export const searchStateSelect = (state: RootState) => state.search;

export const searchTextSelect = createSelector(
  searchStateSelect,
  search => search.searchText,
);
export const searchTextEmptySelect = createSelector(
  searchTextSelect,
  searchText => searchText.length === 0,
);
export const searchMovieIDSelect = createSelector(
  searchStateSelect,
  search => search.movieIDs,
);
export const searchCurrentPageSelect = createSelector(
  searchStateSelect,
  search => search.currentPage,
);
export const searchLastUpdateSelect = createSelector(
  searchStateSelect,
  search => search.lastUpdate,
);
export const searchLastPageSelect = createSelector(
  searchStateSelect,
  search => search.lastPage,
);
export const searchDebouncePendingSelect = createSelector(
  searchStateSelect,
  search => search.debouncePending,
);
export const searchRequestPendingSelect = createSelector(
  searchStateSelect,
  search => search.searchRequestPending,
);
export const searchRequestSlowSelect = createSelector(
  searchStateSelect,
  search => search.requestSlow,
);
export const searchLoadingSelect = createSelector(
  [searchDebouncePendingSelect, searchRequestPendingSelect],
  (searchDebouncePending, searchRequestPending) =>
    searchDebouncePending || searchRequestPending,
);
export const searchPagePendingSelect = createSelector(
  searchStateSelect,
  search => search.paginationPending,
);
