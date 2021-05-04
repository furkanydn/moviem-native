import {MovieListApiResponse} from '../api/movies';
import {MovieAPIResponse} from '../api/type';
import {
  Movie,
  MovieID,
  MovieRequiredPropKey,
  MovieStoreProps,
  NormalizeMovieProps,
  ParsedMovie,
} from '../redux/indexIE';
import {THEME} from './theme';

// Anahtar Ayrımı
export const movieIDsKeyExtract = (movieID: MovieID) => movieID.toString();
const {success, danger, warning} = THEME.COLORS;

// Normalizasyon
export const requireMovieProp: MovieRequiredPropKey[] = [
  'id',
  'title',
  'overview',
  'releaseDate',
  'poster_path',
  'backdropPath',
];

export const goodMovieRate = (rating: number) => rating >= 7;
export const normalMovieRate = (rating: number) => rating >= 5;
export const bacMovieRate = (rating: number) => rating < 5;

export const movieScoreColor = (score: number) =>
  goodMovieRate(score) ? success : normalMovieRate(score) ? warning : danger;

export const lastMovieList = (data: MovieListApiResponse) =>
  data.page >= data.totalPage;

export const enoughMovieInfo = (movie: MovieAPIResponse) =>
  requireMovieProp.every(prop => !!movie[prop]);

export const filterNoInfoMovie = (movies: MovieAPIResponse[]) =>
  movies.filter(enoughMovieInfo) as ParsedMovie[];

export const normalizeMovies = (movies: MovieAPIResponse[] = []) =>
  filterNoInfoMovie(movies).map(movie => normalizeMovies(movie));

const movieStoreProp: MovieStoreProps = {
  isFetching: false,
  isFavoritePending: false,
  isInFavorite: false,
  isInWatchList: false,
  isWatchListPending: false,
};

export const normalizeMovie = (movie: MovieAPIResponse[]): Movie => {
  const normalizeMovieProp: NormalizeMovieProps = {
    year: movie.releaseDate.substr(0, 4),
  };

  return {
    ...movie,
    ...normalizeMovieProp,
    ...movieStoreProp,
  };
};
