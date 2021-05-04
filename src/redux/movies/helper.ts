import {MovieAPIResponse} from '../../api/type';
import {normalizeMovie} from '../../utils/movie';
import StoreService from '../storeService';
import {addMovie} from './action';

export const normalizeAndAddMovie = (movieResponse: MovieAPIResponse[]) => {
  const movies = normalizeMovie(movieResponse);
  const movieIDs = movies.map(movie => movie.id);
  StoreService.dispatch(addMovie(movies));

  return {normalizeMovie: movies, movieIDs};
};
