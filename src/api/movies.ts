import API from './API';
import {withKEY} from './urlKEY';
import {MovieIDParam, MovieStatusType} from '../redux/movies/type';
import {
  MovieAPIResponse,
  MovieAPIDetailed,
  PageParam,
  RatedValue,
  UserIDParams,
} from './type';

// Bileşenler - Tipler
export interface MovieListApiResponse {
  page: number;
  result: MovieAPIResponse[];
  totalPage: number;
  totalResult: number;
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
  statusCode: number;
  statusMessage: string;
}

//- API Bileşenleri - Movies -//

//https://developers.themoviedb.org/3/movies/get-movie-details
export const getMovieDetailAPI = ({movieID}: MovieIDParam) =>
  API.get<MovieAPIDetailed>(withKEY(`/movie/${movieID}`));

//https://developers.themoviedb.org/3/movies/get-movie-account-states
export const getMovieAccountStateAPI = ({
  movieID,
  sessionID,
}: MovieIDParam & UserIDParams) =>
  API.get<GetMovieAccountStateApiResponse>(
    withKEY(`/movie/${movieID}/account_states`) + `&session_id=${sessionID}`,
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
  const {accountID, movieID, status, statusType, sessionID} = param;
  const postQuery = {
    mediaType: 'movie',
    mediaID: movieID,
    [statusType]: status,
  };
  const queryString = API.post<ChangeMovieStatusApiResponse>(
    `${withKEY(`/account/${accountID}/${statusType}`)}&session_id${sessionID}`,
    postQuery,
  );

  return queryString;
};

//https://developers.themoviedb.org/3/account/get-favorite-movies
export const getFavoriteMoviesAPI = ({
  page,
  accountID,
  sessionID,
}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY(
      `/account/${accountID}/favorite/movies`,
    )}&session_id=${sessionID}&page${page}`,
  );

//https://developers.themoviedb.org/3/account/get-movie-watchlist
export const getWatchListMovieAPI = ({
  page,
  accountID,
  sessionID,
}: GetMovieListApiParam) =>
  API.get<MovieListApiResponse>(
    `${withKEY(
      `/account/${accountID}/watchlist/movies`,
    )}&session_id=${sessionID}&page${page}`,
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
