import {mapValues, uniq} from 'lodash';
import moment from 'moment';
import {MovieID} from '../movies/type';
import * as sectionConst from './constants';
import {SectionKeys, Section} from './type';
import {sectionData} from './sectionData';
import {
  SectionAction,
  RefreshSectionRequest,
  RefreshSectionSuccess,
  FetchSectionNextPageSuccess,
  FetchSectionNextPage,
} from './action';

// Durum Bileşenleri
export const commonInitParams = {
  movieIDs: [] as MovieID[],
  currentPage: 1,
  refreshing: false,
  paginationPending: false,
  lastPage: false,
  lastUpdate: undefined as string | undefined,
};

const sectionByID = mapValues(sectionData, (_, id) => ({
  id,
  ...commonInitParams,
})) as Record<SectionKeys, Section>;

export const initState = sectionByID;

type SectionStateType = typeof initState;

export interface SectionState extends SectionStateType {}

//- Bileşenler -//

const refreshSectionRequest = (
  state: SectionState,
  action: RefreshSectionRequest,
): SectionState => {
  const {sectionKey} = action;
  const previousSection = state[sectionKey];
  const afterSession: Section = {...previousSection, refreshing: true};

  return {...state, [sectionKey]: afterSession};
};

const refreshSectionSuccess = (
  state: SectionState,
  action: RefreshSectionSuccess,
): SectionState => {
  const {movieIDs, sectionKey, lastPage} = action;
  const previousSection = state[sectionKey];
  const afterSession: Section = {
    ...previousSection,
    movieIDs,
    currentPage: 1,
    refreshing: false,
    paginationPending: false,
    lastPage,
    lastUpdate: moment().format(),
  };

  return {...state, [sectionKey]: afterSession};
};

const fetchSectionNextPageSuccess = (
  state: SectionState,
  action: FetchSectionNextPageSuccess,
): SectionState => {
  const {movieIDs, sectionKey, lastPage} = action;
  const previousSection = state[sectionKey];
  const uniqID = uniq([...previousSection.movieIDs, ...movieIDs]);
  const afterSession: Section = {
    ...previousSection,
    currentPage: previousSection.currentPage + 1,
    movieIDs: uniqID,
    paginationPending: false,
    lastPage,
    lastUpdate: moment().format(),
  };

  return {...state, [sectionKey]: afterSession};
};

const fetchSectionNextPage = (
  state: SectionState,
  action: FetchSectionNextPage,
): SectionState => {
  const {sectionKey} = action;
  const previousSection = state[sectionKey];
  const {lastPage, paginationPending} = previousSection;

  if (lastPage || paginationPending) {
    return state;
  }

  const afterSession: Section = {...previousSection, paginationPending: true};

  return {...state, [sectionKey]: afterSession};
};

// Bileşenleri Dışarıya Aktarılması
const sectionReducer = (
  state: SectionState | undefined = initState,
  action: SectionAction,
): SectionState => {
  switch (action.type) {
    case sectionConst.REFRESH_SECTION_REQUEST:
      return refreshSectionRequest(state, action);
    case sectionConst.REFRESH_SECTION_SUCCESS:
      return refreshSectionSuccess(state, action);
    case sectionConst.FETCH_SECTION_NEXT_PAGE_SUCCESS:
      return fetchSectionNextPageSuccess(state, action);
    case sectionConst.FETCH_SECTION_NEXT_PAGE:
      return fetchSectionNextPage(state, action);
    default:
      return state;
  }
};

export default sectionReducer;
