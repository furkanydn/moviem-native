import {AuthAction, Explore, Movies, Search} from './index';

export interface WithCallback {
  Sucsess?: () => void;
  Error?: () => void;
}
