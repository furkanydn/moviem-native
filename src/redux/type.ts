import {AuthAction, Explore, Movies, Search, NetworkActions} from './indexIE';

export interface WithCallback {
  Sucsess?: () => void;
  Error?: () => void;
}
