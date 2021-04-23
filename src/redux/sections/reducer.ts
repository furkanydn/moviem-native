import {mapValues, uniq} from 'lodash';
import moment from 'moment';
import {MovieID} from '../movies/type';
import * as sectionConst from './constants';
import {SectionKeys, Section} from './type';
//
import {
  SectionAction,
  RefreshSectionRequest,
  RefreshSectionSuccess,
  FetchSectionNextPageRequest,
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
