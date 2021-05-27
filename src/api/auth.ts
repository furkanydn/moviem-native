import api from './api';
import {withKEY} from './urlKEY';

// Durumlar
export interface CreateGuestSessionApiResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface CreateRequestTokenApiResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ValidateUserCredentialsApiParams {
  username: string;
  password: string;
  request_token: string;
}

export interface ValidateUserCredentialsApiResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateAuthenticatedSessionApiParams {
  request_token: string;
}

export interface CreateAuthenticatedSessionApiResponse {
  success: boolean;
  session_id: string;
}

export interface GetAccountDetailsApiParams {
  session_id: string;
}

export interface GetAccountDetailsApiResponse {
  avatar: {
    gravatar: {
      hash: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

// Api yönetimi
export const createGuestSessionAPI = () =>
  api.get<CreateGuestSessionApiResponse>(
    withKEY('//authentication/guest_session/new'),
  );

export const createRequestTokenAPI = () =>
  api.get<CreateRequestTokenApiResponse>(withKEY('/authentication/token/new'));

export const validateUserCredentialAPI = (
  params: ValidateUserCredentialsApiParams,
) =>
  api.post<ValidateUserCredentialsApiResponse>(
    withKEY('/authentication/token/validate_with_login'),
    params,
  );

export const createAuthSessionAPI = (
  params: CreateAuthenticatedSessionApiParams,
) =>
  api.post<CreateAuthenticatedSessionApiResponse>(
    withKEY('/authentication/session/new'),
    params,
  );

export const getAccountDetailAPI = (params: GetAccountDetailsApiParams) =>
  api.get<GetAccountDetailsApiResponse>(withKEY('/account'), {params});
