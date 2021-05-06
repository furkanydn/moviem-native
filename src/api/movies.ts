import API from './API';
import {withKEY} from './urlKEY';
import {MovieIDParam, MovieStatusType} from '../redux/movies/type';
import {
  MovieAPIDetailed,
  MovieAPIResponse,
  PageParam,
  RatedValue,
  UserIDParams,
} from './type';

// Bileşenler - Tipler
export interface MovieListApiResponse {
  page: number;
  results: MovieAPIResponse[];
  total_pages: number;
  total_results: number;
}

export interface GetMovieListApiParam extends PageParam, UserIDParams {}

export interface GetMovieAccountStateApiResponse {
  id: number;
  favorite: boolean;
  rated: RatedValue | boolean;
  watchlist: boolean;
}

export interface ChangeMovieStatusApiParam extends MovieIDParam, UserIDParams {
  status: boolean;
  statusType: MovieStatusType;
}

export interface ChangeMovieStatusApiResponse {
  status_code: number;
  status_message: string;
}

//- API Bileşenleri - Movies -//

//https://developers.themoviedb.org/3/movies/get-movie-details
export const getMovieDetailAPI = ({movieID}: MovieIDParam) =>
  API.get<MovieAPIDetailed>(withKEY(`/movie/${movieID}`));

//https://developers.themoviedb.org/3/movies/get-movie-account-states
export const getMovieAccountStateAPI = ({
  movieID,
  sessionId,
}: MovieIDParam & UserIDParams) =>
  API.get<GetMovieAccountStateApiResponse>(
    withKEY(`/movie/${movieID}/account_states`) + `&session_id=${sessionId}`,
  );

//https://developers.themoviedb.org/3/movies/get-movie-recommendations
export const getMovieRecommendationsAPI = ({
  movieID,
  page,
}: MovieIDParam & PageParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY(`/movie/${movieID}/recommendations`)}&page=${page}`,
  );

//https://developers.themoviedb.org/3/movies/get-popular-movies
export const getPopularMovieAPI = ({page}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(`${withKEY('movie/popular')}&page=${page}`);

//https://developers.themoviedb.org/3/movies/get-top-rated-movies
export const getTopRatedMovieAPI = ({page}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(`${withKEY('/movie/top_rated')}&page=${page}`);

//- API Bileşenleri - Account -//

//https://developers.themoviedb.org/3/account/mark-as-favorite or https://developers.themoviedb.org/3/account/add-to-watchlist
export const changeMovieStatusAPI = (param: ChangeMovieStatusApiParam) => {
  const {accountId, movieID, status, statusType, sessionId} = param;
  const postQuery = {
    mediaType: 'movie',
    mediaID: movieID,
    [statusType]: status,
  };
  return API.post<ChangeMovieStatusApiResponse>(
    `${withKEY(`/account/${accountId}/${statusType}`)}&session_id${sessionId}`,
    postQuery,
  );
};

//https://developers.themoviedb.org/3/account/get-favorite-movies
export const getFavoriteMoviesAPI = ({
  page,
  accountId,
  sessionId,
}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY(
      `/account/${accountId}/favorite/movies`,
    )}&session_id=${sessionId}&page${page}`,
  );

//https://developers.themoviedb.org/3/account/get-movie-watchlist
export const getWatchListMovieAPI = ({
  page,
  accountId,
  sessionId,
}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY(
      `/account/${accountId}/watchlist/movies`,
    )}&session_id=${sessionId}&page${page}`,
  );

//- API Bileşenleri - Search -//

//https://developers.themoviedb.org/3/search/search-movies
export const getMoviesBySearchQueryAPI = ({
  query,
  page,
}: {query: string} & PageParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY('/search/movie')}&page=${page}&query${query}`,
  );

//- API Bileşenleri - Trending -//

//https://developers.themoviedb.org/3/trending/get-trending
export const getTrendingDailyMovieAPI = ({page}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY('/trending/movie/day')}&page=${page}`,
  );

export const getTrendingWeeklyMovieAPI = ({page}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY('/trending/movie/week')}&page=${page}`,
  );
