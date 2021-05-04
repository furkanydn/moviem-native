import {MovieAPIDetailed, MovieAPIResponse} from '../../api/type';

export type MovieID = number;
export type MovieStatusType = 'watchlist' | 'favorite';
export type MovieAPIKey = keyof MovieAPIResponse;
export type MovieRequiredProps = Required<
  Pick<
    MovieAPIResponse,
    'id' | 'title' | 'overview' | 'releaseDate' | 'poster_path' | 'backdropPath'
  >
>;
export type MovieRequiredPropKey = keyof MovieRequiredProps;
export type MovieNotRequiredProps = Omit<
  MovieAPIResponse,
  MovieRequiredPropKey
>;
export type MovieNotRequiredPropKey = keyof MovieNotRequiredProps;
export type ParsedMovie = MovieRequiredProps & MovieNotRequiredProps;

export interface NormalizeMovieProps {
  year: string;
}
export interface MovieStoreProps {
  isFetching: boolean;
  isWatchListPending: boolean;
  isInWatchList: boolean;
  isFavoritePending: boolean;
  isInFavorite: boolean;
  movieDetailed?: MovieAPIDetailed;
  recommendations?: MovieID[];
}
export interface Movie
  extends ParsedMovie,
    NormalizeMovieProps,
    MovieStoreProps {}
// Bileşenler
export interface MovieIDParam {
  movieID: MovieID;
}
