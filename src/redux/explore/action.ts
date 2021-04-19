import {SwipeDirect} from '../../components/general/Deck';
import {MovieID} from '../movies/type';
import * as expActions from './constants';

// Bileşenlerin Hazırlanması
export const exploreLoadRequest = () =>
  <const>{type: expActions.EXPLORE_MOVIES_LOAD_REQUEST};
export const exploreMovieLoad = () =>
  <const>{type: expActions.EXPLORE_MOVIES_LOAD};
export const exploreLoadSuccess = (movieIDs: MovieID[]) =>
  <const>{type: expActions.EXPLORE_MOVIES_LOAD_SUCCESS, movieIDs};
export const explorePosterLoaded = (movieIDs: MovieID[]) =>
  <const>{type: expActions.EXPLORE_MOVIES_POSTERS_LOADED, movieIDs};
export const exploreSwiped = (swipeDirection: SwipeDirect) =>
  <const>{type: expActions.EXPLORE_MOVIE_SWIPED, swipeDirection};
export const exploreResolved = (ID: string) =>
  <const>{type: expActions.EXPLORE_ACTION_RESOLVED, ID};

// Bileşenlerin Dışarı Aktarılması
export interface ExploreLoadRequest
  extends ReturnType<typeof exploreLoadRequest> {}
export interface ExploreMovieLoad extends ReturnType<typeof exploreMovieLoad> {}
export interface ExploreLoadSuccess
  extends ReturnType<typeof exploreLoadSuccess> {}
export interface ExplorePosterLoaded
  extends ReturnType<typeof explorePosterLoaded> {}
export interface ExploreSwiped extends ReturnType<typeof exploreSwiped> {}
export interface ExploreResolved extends ReturnType<typeof exploreResolved> {}

// Dışarıda Kullanılacak Bileşenler
export type Explore =
  | ExploreLoadRequest
  | ExploreMovieLoad
  | ExploreLoadSuccess
  | ExplorePosterLoaded
  | ExploreSwiped
  | ExploreResolved;
