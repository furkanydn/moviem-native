import memoizeOne from 'memoize-one';
import {createSelector} from 'reselect';
import {RootState} from '../type';
import {MovieID} from './type';

export const movieSelect = (state: RootState) => state.movies;
export const getMovieSelectByID = (movieID: MovieID) =>
  createSelector(movieSelect, movies => movies[movieID]);
export const getMovieSelectByIDs = memoizeOne((movieIDs: MovieID[]) =>
  createSelector(movieSelect, movies =>
    movieIDs.map(movieID => movies[movieID]),
  ),
);
