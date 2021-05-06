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
  logo_path: string | null;
  origin_country: string;
}
// https://www.iso.org/standard/72482.html
export interface ProductionCountry {
  name: string;
  iso_3166_1: string;
}
// https://www.iso.org/standard/22109.html
export interface SpokenLanguage {
  name: string;
  iso_639_1: string;
}
export interface MovieAPIResponse {
  id?: MovieID;
  poster_path?: string;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string;
  popularity?: number;
  vote_count?: number;
  vote_average?: number;
}
export interface MovieAPIDetailed {
  id?: number;
  adult?: boolean;
  backdrop_path?: string;
  budget?: number;
  genres: Genre[];
  homepage?: string | null;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: SpokenLanguage[];
  status?: MovieStatus;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_count?: number;
  vote_average?: number;
}
// Parametreler
export interface PageParam {
  page: number;
}
export interface UserIDParams {
  sessionId: string;
  accountId: number;
}
// API Film Durumları
export type MovieStatus =
  | 'Released'
  | 'Canceled'
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production';
