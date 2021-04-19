import {AuthAction} from './auth/action';
import {Explore} from './explore/action';

export interface WithCallback {
  Sucsess?: () => void;
  Error?: () => void;
}
