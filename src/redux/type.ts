import {AuthAction, Explore, Movies, Search, NetworkActions} from './indexAction';

export interface WithCallback {
  Sucsess?: () => void;
  Error?: () => void;
}
