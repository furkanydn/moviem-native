import {MovieID} from '../redux/movies/type';

// API Film Bileşenleri
export interface Genre {
  id: number;
  name: string;
}
export interface RatedValue {
  value: number;
}
export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}
// https://www.iso.org/standard/72482.html
export interface ProductionCountry {
  name: string;
  iso3166: string;
}
// https://www.iso.org/standard/22109.html
export interface SpokenLanguage {
  name: string;
  iso639: string;
}
export interface MovieAPIResponse {
  id?: MovieID;
  poster_path?: string;
  adult?: boolean;
  overview?: string;
  releaseDate?: string;
  genreID?: number[];
  originalTitle?: string;
  originalLanguage?: string;
  title?: string;
  backdropPath?: string;
  popularity?: number;
  voteCount?: number;
  voteAverage?: number;
}
export interface MovieAPIDetailed {
  id?: number;
  adult?: boolean;
  backdropPath?: string;
  budget?: number;
  genre: Genre[];
  homepage?: string | null;
  imdbID?: string | null;
  originalLanguage?: string;
  originalTitle?: string;
  overview?: string | null;
  popularity?: number;
  posterPath?: string | null;
  productionCompany?: ProductionCompany[];
  productionCountry?: ProductionCountry[];
  releaseDate?: string;
  revenue?: number;
  runtime?: number | null;
  spokenLanguage?: SpokenLanguage[];
  status?: MovieStatus;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  voteCount?: number;
  voteAverage?: number;
}
// Parametreler
export interface PageParam {
  page: number;
}
export interface UserIDParams {
  sessionID: string;
  accountID: number;
}
// API Film Durumları
export type MovieStatus =
  | 'Released'
  | 'Canceled'
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production';
