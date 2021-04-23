import {commonInitParams} from './reducer';

// Bölümler
export type BrowseSectionKey =
  | 'popular'
  | 'topRated'
  | 'trendingDaily'
  | 'trendingWeekly';
export type LibrarySectionKey = 'myFavorite' | 'myWatchlist';
export type SectionKeys = BrowseSectionKey | LibrarySectionKey;

export interface SectionBase {
  id: SectionKeys;
}

// Ortak Kullanılacak Alan Paremetreleri
type CommonSectionParams = typeof commonInitParams;
export interface Section extends CommonSectionParams, SectionBase {}
