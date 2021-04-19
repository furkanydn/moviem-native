import {AuthAction} from "./auth/action";

export interface WithCallback {
  Sucsess?: () => void;
  Error?: () => void;
}
