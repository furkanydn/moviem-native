import {AxiosResponse} from 'axios';
import {call, put, select} from 'redux-saga/effects';
import {MovieListApiResponse} from '../../api/movies';
import {UserIDParams} from '../../api/type';
import {lastMovieList} from '../../utils/movie';
import {userIDParamsSelect} from '../auth/selector';
import {normalizeAndAddMovie} from '../movies/helper';
import {handleNetworkReduxError} from '../network/action';
import {FETCH_SECTION_NEXT_PAGE} from './constants';
import {sectionData} from './sectionData';
import {getSectionSelectByKey} from './selector';
import {Section} from './type';
import {isSameSectionRequest} from './utils';
import {
  FetchSectionNextPage,
  fetchSectionNextPage,
  FetchSectionNextPageRequest,
  fetchSectionNextPageSuccess,
  RefreshSectionRequest,
  refreshSectionSuccess,
} from './action';

// Yardımcı Nesneler

export function* refreshSectionRequestSaga(action: RefreshSectionRequest) {
  try {
    const {sectionKey} = action;
    const {fetchFunc} = sectionData[sectionKey];
    const userIDs: UserIDParams = yield select(userIDParamsSelect);
    const {data}: AxiosResponse<MovieListApiResponse> = yield call(fetchFunc, {
      page: 1,
      ...userIDs,
    });
    const {movieIDs} = normalizeAndAddMovie(data.results);

    yield put(
      refreshSectionSuccess({
        sectionKey,
        movieIDs,
        lastPage: lastMovieList(data),
      }),
    );
  } catch (e) {
    yield put(
      handleNetworkReduxError(e, action, {
        isSameAction: isSameSectionRequest,
        clearActionFromQueue: FETCH_SECTION_NEXT_PAGE,
      }),
    );
  }
}

export function* fetchSectionNextPageRequestSaga(
  action: FetchSectionNextPageRequest,
) {
  const {sectionKey} = action;
  const sectionSelect = getSectionSelectByKey(sectionKey);
  const {lastPage, paginationPending} = (yield select(
    sectionSelect,
  )) as Section;

  if (!lastPage && !paginationPending) {
    yield put(fetchSectionNextPage(sectionKey));
  }
}

export function* fetchSectionNextPageSaga(action: FetchSectionNextPage) {
  try {
    const {sectionKey, requestTime} = action;
    const {fetchFunc} = sectionData[sectionKey];
    const sectionSelect = getSectionSelectByKey(sectionKey);
    const userIDs: UserIDParams = yield select(userIDParamsSelect);
    const {currentPage} = (yield select(sectionSelect)) as Section;
    const {data}: AxiosResponse<MovieListApiResponse> = yield call(fetchFunc, {
      page: currentPage + 1,
      ...userIDs,
    });
    const {lastUpdate} = (yield select(sectionSelect)) as Section;
    const isRevUpdate = requestTime.isAfter(lastUpdate);

    if (isRevUpdate) {
      const {movieIDs} = normalizeAndAddMovie(data.results);
      yield put(
        fetchSectionNextPageSuccess({
          sectionKey,
          movieIDs,
          lastPage: lastMovieList(data),
        }),
      );
    }
  } catch (e) {
    yield put(
      handleNetworkReduxError(e, action, {isSameAction: isSameSectionRequest}),
    );
  }
}
