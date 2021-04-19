import {ResponseError} from '../../utils/error';
import {WithCallback} from '../type';
import {AuthUSER, GuestUSER} from './type';
import * as authConst from './constants';

// Kullanılacak İşlemler - Kullanıcı İstekleri
export const createAuthSessionRequest = (
  params: {username: string; password: string} & WithCallback,
) => <const>{type: authConst.CREATE_AUTHENTICATED_SESSION_REQUEST, ...params};

export const createAuthSessionSuccess = (user: AuthUSER) =>
  <const>{type: authConst.CREATE_AUTHENTICATED_SESSION_SUCCESS, user};

export const createAuthSessionFail = (error: ResponseError) =>
  <const>{type: authConst.CREATE_AUTHENTICATED_SESSION_FAILURE, error};

// Kullanılacak İşlemler - Misafir İstekleri
export const createGuestSessionRequest = (params: WithCallback = {}) =>
  <const>{type: authConst.CREATE_GUEST_SESSION_REQUEST, ...params};

export const createGuestSessionSuccess = (user: GuestUSER) =>
  <const>{type: authConst.CREATE_GUEST_SESSION_SUCCESS, user};

export const createGuestSessionFail = (error: ResponseError) =>
  <const>{type: authConst.CREATE_GUEST_SESSION_FAILURE, error};

export const createLogOutRequest = () => <const>{type: authConst.LOG_OUT};

// Dışarıya Aktarılacak Bileşenler - Kullanıcı ve Misafir
export interface CreateAuthSessionRequest
  extends ReturnType<typeof createAuthSessionRequest> {}
export interface CreateAuthSessionSuccess
  extends ReturnType<typeof createAuthSessionSuccess> {}
export interface CreateAuthSessionFail
  extends ReturnType<typeof createAuthSessionFail> {}

export interface CreateGuestSessionRequest
  extends ReturnType<typeof createGuestSessionRequest> {}
export interface CreateGuestSessionSuccess
  extends ReturnType<typeof createGuestSessionSuccess> {}
export interface CreateGuestSessionFail
  extends ReturnType<typeof createGuestSessionFail> {}

export interface CreateLogOutRequest
  extends ReturnType<typeof createLogOutRequest> {}

export type AuthAction =
  | CreateAuthSessionRequest
  | CreateAuthSessionSuccess
  | CreateAuthSessionFail
  | CreateGuestSessionRequest
  | CreateGuestSessionSuccess
  | CreateGuestSessionFail
  | CreateLogOutRequest;
