import {AxiosResponse} from 'axios';
import {random} from 'lodash';
import {call, delay, put, select, take} from 'redux-saga/effects';
//
import {getPopularMovieAPI, MovieListApiResponse} from '../../api/movies';
import {UserIDParams} from '../../api/type';
import {CardImage} from '../../components/index';
import {prefecthImages} from '../../utils/network';
import {userIDParamsSelect} from '../auth/selector';
import {changeMovieStatusRequest} from '../movies/action';
import {
  CHANGE_MOVIE_STATUS_FAILURE,
  CHANGE_MOVIE_STATUS_SUCCESS,
} from '../movies/constants';
import {normalizeAndAddMovie} from '../movies/helper';
import {getMovieSelectByIDs} from '../movies/selector';
import {Movie, MovieID} from '../movies/type';
import {handleNetworkReduxError} from '../network/action';
import {isInternetReachableSelect} from '../network/selector';
import {AFTER_REHYDRATE} from '../rehydrate/constants';
import {
  exploreResolved,
  ExploreMovieLoad,
  exploreMovieLoad,
  ExploreLoadRequest,
  exploreLoadRequest,
  exploreLoadSuccess,
  explorePosterLoaded,
  ExploreSwiped,
} from './action';
import {EXPLORE_MOVIE_SWIPED, EXPLORE_MOVIES_LOAD_SUCCESS} from './constants';
import {
  exploredActionQueueSelect,
  exploredSeenMapSelect,
  exploreMovieIdsSelect,
  isExploreLoadSelect,
  loadPosterMovieSelect,
} from './selector';

// Yardımcı Nesneler
const isEnough = (movieIDs: MovieID[]) => movieIDs.length > 10;

export function* exploreMoviesLoadRequestSaga({}: ExploreLoadRequest) {
  const exploreMovieIDs: MovieID[] = yield select(exploreMovieIdsSelect);
  const isExploreLoading: boolean = yield select(isExploreLoadSelect);

  if (isEnough(exploreMovieIDs) || isExploreLoading) {
    return;
  }

  yield put(exploreMovieLoad());
}

// TMDB api'sinde "Explore" bitiş noktası yoktu, Bu yüzden film çekmek için bazı mekanizmalar oluşturmak zorunda kaldım.
// "Popular" listesindeki filmler günlük olarak güncellenir.
// Film alma işlemini daha hızlı hale getirmek için, sayfa numarasının rastgele artırıldığı bir ayar vardır.
export function* exploreMoviesLoadSaga(action: ExploreMovieLoad) {
  try {
    const userID: UserIDParams = yield select(userIDParamsSelect);
    let page = 1;
    let increaseD = 1;
    const accumulateMID = [];

    while (accumulateMID.length < 20) {
      page = page + random(1, increaseD);
      increaseD = increaseD + 2;

      const {data}: AxiosResponse<MovieListApiResponse> = yield call(
        getPopularMovieAPI,
        {
          page,
          ...userID,
        },
      );
      const seenIDMap: ReturnType<typeof exploredSeenMapSelect> = yield select(
        exploredSeenMapSelect,
      );
      const unExplored = data.results.filter(
        notNormalize => !seenIDMap[notNormalize.id],
      );
      const {movieIDs} = normalizeAndAddMovie(unExplored);

      accumulateMID.push(...movieIDs);
    }
    yield put(exploreLoadSuccess(accumulateMID));
  } catch (error) {
    yield put(handleNetworkReduxError(error, action));
  }
}

export function* movieSwiped({}: ExploreSwiped) {
  const exploreIDs: MovieID[] = yield select(exploreMovieIdsSelect);
  if (!isEnough(exploreIDs)) {
    yield put(exploreLoadRequest());
  }
}

export function* preloadExploreImageSaga() {
  yield take(AFTER_REHYDRATE);
  const preloadCount = 10;
  const onLoadDelay = 500;

  while (true) {
    const exploreMovieIDs: MovieID[] = yield select(exploreMovieIdsSelect);
    const loadedMovieIDs: MovieID[] = yield select(loadPosterMovieSelect);
    const movieIDstoLoad = exploreMovieIDs
      .filter(movieID => !loadedMovieIDs.includes(movieID))
      .slice(0, preloadCount);
    const movieToLoad: Movie[] = yield select(
      getMovieSelectByIDs(movieIDstoLoad),
    );
    const movieImagePathLoad = movieToLoad.map(movie =>
      CardImage(movie.poster_path),
    );

    if (movieIDstoLoad.length > 0) {
      const isInternet: boolean = yield select(isInternetReachableSelect);
      if (isInternet) {
        try {
          yield call(prefecthImages, movieImagePathLoad);
          yield put(explorePosterLoaded(movieIDstoLoad));
        } catch (e) {
          yield delay(onLoadDelay);
        }
      } else {
        yield delay(onLoadDelay);
      }
    } else {
      yield take(EXPLORE_MOVIES_LOAD_SUCCESS);
    }
  }
}

export function* resolveActionQueueSaga() {
  const delayFailure = 2000;

  while (true) {
    const actQueue: ReturnType<typeof exploredActionQueueSelect> = yield select(
      exploredActionQueueSelect,
    );

    if (actQueue.length > 0) {
      const socialAct = actQueue[0];
      const {id, actionType, movieID} = socialAct;

      if (actionType === 'skip') {
        yield put(exploreResolved(id));
      } else {
        const isInternet: boolean = yield select(isInternetReachableSelect);

        if (isInternet) {
          yield put(
            changeMovieStatusRequest({
              movieID,
              status: true,
              statusType: actionType,
            }),
          );
          const changeStatusAction = yield take([
            CHANGE_MOVIE_STATUS_SUCCESS,
            CHANGE_MOVIE_STATUS_FAILURE,
          ]);
          if (changeStatusAction.type === CHANGE_MOVIE_STATUS_SUCCESS) {
            yield put(exploreResolved(id));
          } else {
            yield delay(delayFailure);
          }
        } else {
          yield delay(delayFailure);
        }
      }
    } else {
      yield take([EXPLORE_MOVIE_SWIPED, AFTER_REHYDRATE]);
    }
  }
}
