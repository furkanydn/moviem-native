//https://www.ietf.org/rfc/rfc4122.txt
import uuid from 'uuid';
import {uniq} from 'lodash';
//
import * as expConst from './constants';
import {socialActMap} from './exploreData';
import {SocialAction} from './type';
import {
  Explore,
  ExploreResolved,
  ExploreLoadSuccess,
  ExplorePosterLoaded,
  ExploreSwiped,
} from './action';
//
import {AfterRehydrate, AFTER_REHYDRATE, MovieID} from '../indexIE';

//Durum Bileşenleri
export const initState = {
  movieIDs: [] as MovieID[],
  loadPosterMovieIDs: [] as MovieID[],
  isLoad: false,
  actQueue: [] as SocialAction[],
  seenIDsMap: {} as Record<MovieID, boolean>,
};
type ExpState = typeof initState;
export interface ExploreState extends ExpState {}

// Bileşenleri Döndüren Fonksiyonlar
const exploreMoviesLoad = (state: ExploreState): ExploreState => ({
  ...state,
  isLoad: true,
});

const exploreActResolve = (
  state: ExploreState,
  action: ExploreResolved,
): ExploreState => ({
  ...state,
  actQueue: state.actQueue.filter(socialAct => socialAct.id !== action.ID),
});

const exploreMoviesSuccess = (
  state: ExploreState,
  action: ExploreLoadSuccess,
): ExploreState => {
  const {movieIDs} = action;
  const newIDsMap = movieIDs.reduce(
    (actually: any, value) => ((actually[value] = true), actually),
    {},
  );

  return {
    ...state,
    isLoad: false,
    movieIDs: uniq([...state.movieIDs, ...movieIDs]),
    seenIDsMap: {...state.seenIDsMap, ...newIDsMap},
  };
};

const exploreMoviePosterLoad = (
  state: ExploreState,
  action: ExplorePosterLoaded,
): ExploreState =>
  <ExploreState>{
    ...state,
    loadPosterMovieIDs: [...state.loadPosterMovieIDs, action.movieIDs],
  };

const exploreMovieSwipe = (
  state: ExploreState,
  action: ExploreSwiped,
): ExploreState => {
  const [movieID, ...restMovieID] = state.movieIDs;
  const socialAction: SocialAction = {
    id: uuid.v4(),
    movieID,
    actionType: socialActMap[action.swipeDirection],
  };

  return {
    ...state,
    movieIDs: restMovieID,
    actQueue: [...state.actQueue, socialAction],
  };
};

const afterRehydrate = (state: ExploreState): ExploreState => ({
  ...state,
  isLoad: false,
  loadPosterMovieIDs: [],
});

// Bütün Bileşenlerin Tanımlanması
const exploreReducer = (
  state: ExploreState | undefined = initState,
  action: Explore | AfterRehydrate,
): ExploreState => {
  switch (action.type) {
    case expConst.EXPLORE_MOVIES_LOAD:
      return exploreMoviesLoad(state);
    case expConst.EXPLORE_MOVIES_LOAD_SUCCESS:
      return exploreMoviesSuccess(state, action);
    case expConst.EXPLORE_MOVIE_SWIPED:
      return exploreMovieSwipe(state, action);
    case expConst.EXPLORE_ACTION_RESOLVED:
      return exploreActResolve(state, action);
    case expConst.EXPLORE_MOVIES_POSTERS_LOADED:
      return exploreMoviePosterLoad(state, action);
    case AFTER_REHYDRATE:
      return afterRehydrate(state);
    default:
      return state;
  }
};

export default exploreReducer;
