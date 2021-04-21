import {ResponseError} from '../../utils/error';
import {AfterRehydrate} from '../rehydrate/action';
import {AFTER_REHYDRATE} from '../rehydrate/constants';
import * as AuthConst from './constants';
import {USER} from './type';
import {
  AuthAction,
  CreateAuthSessionFail,
  CreateAuthSessionSuccess,
  CreateGuestSessionFail,
  CreateGuestSessionSuccess,
} from './action';

//
export const initState = {
  user: undefined as USER | undefined,
  requests: {
    createAuthSessionPending: false,
    createAuthSessionError: undefined as ResponseError | undefined,
    createGuestSessionPending: false,
    createGuestSessionError: undefined as ResponseError | undefined,
  },
};

//
type AuthStateType = typeof initState;
export interface AuthState extends AuthStateType {}

// Kullanıcı Bileşenleri
const createAuthSessionRequest = (state: AuthState): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createAuthSessionPending: true,
    createAuthSessionError: undefined,
  },
});

const createAuthSessionSuccess = (
  state: AuthState,
  action: CreateAuthSessionSuccess,
): AuthState => ({
  ...state,
  user: action.user,
  requests: {
    ...state.requests,
    createAuthSessionPending: false,
    createAuthSessionError: undefined,
  },
});

const createAuthSessionFail = (
  state: AuthState,
  action: CreateAuthSessionFail,
): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createAuthSessionPending: false,
    createAuthSessionError: action.error,
  },
});

// Misafir Bileşenleri
const createGuestSessionRequest = (state: AuthState): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createGuestSessionPending: true,
    createGuestSessionError: undefined,
  },
});

const createGuestSessionSuccess = (
  state: AuthState,
  action: CreateGuestSessionSuccess,
): AuthState => ({
  ...state,
  user: action.user,
  requests: {
    ...state.requests,
    createGuestSessionPending: false,
    createGuestSessionError: undefined,
  },
});

const createGuestSessionFail = (
  state: AuthState,
  action: CreateGuestSessionFail,
): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createGuestSessionPending: false,
    createGuestSessionError: action.error,
  },
});

// Farklı Eylem Sonuçları İçin
const createLogOutRequest = (): AuthState => ({...initState});

const afterRehydrate = (state: AuthState): AuthState => ({
  ...state,
  requests: initState.requests,
});

const authReducer = (
  state: AuthState | undefined = initState,
  action: AuthAction | AfterRehydrate,
): AuthState => {
  switch (action.type) {
    case AuthConst.CREATE_AUTHENTICATED_SESSION_REQUEST:
      return createAuthSessionRequest(state);
    case AuthConst.CREATE_AUTHENTICATED_SESSION_SUCCESS:
      return createAuthSessionSuccess(state, action);
    case AuthConst.CREATE_AUTHENTICATED_SESSION_FAILURE:
      return createAuthSessionFail(state, action);

    case AuthConst.CREATE_GUEST_SESSION_REQUEST:
      return createGuestSessionRequest(state);
    case AuthConst.CREATE_GUEST_SESSION_SUCCESS:
      return createGuestSessionSuccess(state, action);
    case AuthConst.CREATE_GUEST_SESSION_FAILURE:
      return createGuestSessionFail(state, action);

    case AuthConst.LOG_OUT:
      return createLogOutRequest();
    case AFTER_REHYDRATE:
      return afterRehydrate(state);
    default:
      return state;
  }
};

export default authReducer;
