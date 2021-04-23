import moment from 'moment';
import {MovieID} from '../movies/type';
import * as sectionConst from './constants';
import {SectionKeys} from './type';

//  Arayüz Protokolü
interface SectionSuccessFetchParam {
  sectionKey: SectionKeys;
  movieIDs: MovieID[];
  lastPage: boolean;
}

// Durum Bileşenleri - Yenileme İşlemleri
export const refreshSectionRequest = (sectionKey: SectionKeys) =>
  <const>{type: sectionConst.REFRESH_SECTION_REQUEST, sectionKey};

export const refreshSectionSuccess = (param: SectionSuccessFetchParam) =>
  <const>{type: sectionConst.REFRESH_SECTION_SUCCESS, ...param};

// Durum Bileşenleri - Getirme İşlemleri
export const fetchSectionNextPageRequest = (sectionKey: SectionKeys) =>
  <const>{type: sectionConst.FETCH_SECTION_NEXT_PAGE_REQUEST, sectionKey};
export const fetchSectionNextPageSuccess = (param: SectionSuccessFetchParam) =>
  <const>{type: sectionConst.FETCH_SECTION_NEXT_PAGE_SUCCESS, ...param};
export const fetchSectionNextPage = (sectionKey: SectionKeys) =>
  <const>{
    type: sectionConst.FETCH_SECTION_NEXT_PAGE,
    sectionKey,
    requestTime: moment(),
  };

// Durum Bileşenlerinin Dışarı Aktarılması
export interface RefreshSectionRequest
  extends ReturnType<typeof refreshSectionRequest> {}
export interface RefreshSectionSuccess
  extends ReturnType<typeof refreshSectionSuccess> {}

export interface FetchSectionNextPageRequest
  extends ReturnType<typeof fetchSectionNextPageRequest> {}
export interface FetchSectionNextPageSuccess
  extends ReturnType<typeof fetchSectionNextPageSuccess> {}
export interface FetchSectionNextPage
  extends ReturnType<typeof fetchSectionNextPage> {}

// Dışarıda Kullanılacak Bileşenler
export type SectionAction =
  | RefreshSectionRequest
  | RefreshSectionSuccess
  | FetchSectionNextPageRequest
  | FetchSectionNextPageSuccess
  | FetchSectionNextPage;
