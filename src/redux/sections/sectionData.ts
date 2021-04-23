import {AxiosPromise} from 'axios';
import {BrowseSectionKey, LibrarySectionKey, SectionKeys} from './type';
import {
  GetMovieListApiParam,
  MovieListApiResponse,
  getPopularMovieAPI,
  getTopRatedMovieAPI,
  getWatchListMovieAPI,
  getFavoriteMoviesAPI,
  getTrendingDailyMovieAPI,
  getTrendingWeeklyMovieAPI,
} from '../../api/movies';

// Durum Bileşeni
interface SectionData {
  title: string;
  fetchFunc: (
    param: GetMovieListApiParam,
  ) => AxiosPromise<MovieListApiResponse>;
}

// Durum Tip Verileri
export const browseSectionKey: BrowseSectionKey[] = [
  'popular',
  'topRated',
  'trendingDaily',
  'trendingWeekly',
];

export const librarySectionKey: LibrarySectionKey[] = [
  'myFavorite',
  'myWatchlist',
];

// Durum Bileşenleri Özellik Uygulanması
export const sectionData: Record<SectionKeys, SectionData> = {
  popular: {title: 'Popular', fetchFunc: getPopularMovieAPI},
  topRated: {title: 'Top Rated', fetchFunc: getTopRatedMovieAPI},
  trendingDaily: {title: 'Trending Daily', fetchFunc: getTrendingDailyMovieAPI},
  trendingWeekly: {
    title: 'Trending Weekly',
    fetchFunc: getTrendingWeeklyMovieAPI,
  },
  myFavorite: {title: 'My Favorite', fetchFunc: getFavoriteMoviesAPI},
  myWatchlist: {title: 'My Watchlist', fetchFunc: getWatchListMovieAPI},
};
