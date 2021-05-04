import {put, select} from 'redux-saga/effects';
import {exploreMovieIdsSelect} from '../explore/selector';
import {filterUnusedMovieData} from '../movies/action';
import {AfterRehydrate} from './action';

// Yardımcı Nesne
export function* afterRehydrateSaga({}: AfterRehydrate) {
  const exploreMovieIDs = yield select(exploreMovieIdsSelect);
  yield put(filterUnusedMovieData({movieIDs: exploreMovieIDs}));
}
