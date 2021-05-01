import {createSelector} from 'reselect';
import {RootState} from '../type';

export const exploreStateSelect = (state: RootState) => state.explore;
export const exploreMovieIdsSelect = createSelector(
  exploreStateSelect,
  explore => explore.movieIDs,
);
export const loadPosterMovieSelect = createSelector(
  exploreStateSelect,
  explore => explore.loadPosterMovieIDs,
);
export const exploreMovieLoadPosterSelect = createSelector(
  [exploreMovieIdsSelect, loadPosterMovieSelect],
  (movieIDs, loadedPosterMovieIDs) =>
    movieIDs.filter(movieID => loadedPosterMovieIDs.includes(movieID)),
);
export const exploredSeenMapSelect = createSelector(
  exploreStateSelect,
  explore => explore.seenIDsMap,
);
export const exploredActionQueueSelect = createSelector(
  exploreStateSelect,
  explore => explore.actQueue,
);
export const isExploreLoadSelect = createSelector(
  exploreStateSelect,
  explore => explore.isLoad,
);
