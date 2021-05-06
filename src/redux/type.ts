import {
  AuthAction,
  Explore,
  Movies,
  Search,
  NetworkActions,
  Rehydrates,
  SectionAction,
  persistedReducer,
} from './indexIE';

// Durum Bileşenleri
export type RootAction =
  | AuthAction
  | Explore
  | Movies
  | Search
  | NetworkActions
  | Rehydrates
  | SectionAction;

export type RootState = ReturnType<typeof persistedReducer>;

// Farklı İstekler ve Geri Dönüşler İçin
export interface WithCallback {
  oSuccess?: () => void;
  oError?: () => void;
}
