import {AxiosResponse} from 'axios';
import {call, put} from 'redux-saga/effects';
//
import {
  createAuthSessionAPI,
  createGuestSessionAPI,
  createRequestTokenAPI,
  CreateAuthenticatedSessionApiResponse,
  CreateGuestSessionApiResponse,
  CreateRequestTokenApiResponse,
  getAccountDetailAPI,
  GetAccountDetailsApiResponse,
  validateUserCredentialAPI,
} from '../../api/auth';
import {getErrorMessage} from '../../api/errors';
import {ToastMessage} from '../../components/index';
import NavigationService from '../../routes/NavigationService';
import {routeName} from '../../routes/routeName';
import {CreateResponseError} from '../../utils/error';
import {createAuthUserAccountData} from '../../utils/user';
import {
  createAuthSessionFail,
  createAuthSessionSuccess,
  createGuestSessionFail,
  createGuestSessionSuccess,
  CreateGuestSessionRequest,
  CreateAuthSessionRequest,
} from './action';

//
export function* createGuestSessionSaga({
  onError,
  onSuccess,
}: CreateGuestSessionRequest) {
  try {
    const {data}: AxiosResponse<CreateGuestSessionApiResponse> = yield call(
      createGuestSessionAPI,
    );
    if (!data.success) {
      throw new Error('Session creation was unsuccessful');
    }
    yield put(
      createGuestSessionSuccess({
        sessionID: data.guest_session_id,
        guest: true,
      }),
    );
    yield call(createGuestSessionSaga);
    onSuccess && onSuccess();
  } catch (error) {
    ToastMessage.showMessage('Something went wrong. \nPlease try again later.');
    yield put(createGuestSessionFail(CreateResponseError(error.message)));
    onError && onError();
  }
}

export function* createAuthSessionSaga({
  username,
  password,
  onSuccess,
  onError,
}: CreateAuthSessionRequest) {
  try {
    const {
      data: {request_token},
    }: AxiosResponse<CreateRequestTokenApiResponse> = yield call(
      createRequestTokenAPI,
    );
    const {
      data: {success},
    }: AxiosResponse<CreateRequestTokenApiResponse> = yield call(
      validateUserCredentialAPI,
      {
        request_token,
        username,
        password,
      },
    );
    if (!success) {
      throw new Error('Validation of user credentials was unsuccessful');
    }
    const {
      data: {session_id},
    }: AxiosResponse<CreateAuthenticatedSessionApiResponse> = yield call(
      createAuthSessionAPI,
      {request_token},
    );
    const {
      data,
    }: AxiosResponse<GetAccountDetailsApiResponse> = yield call(
      getAccountDetailAPI,
      {session_id},
    );
    const user = createAuthUserAccountData(data, session_id);
    yield put(createAuthSessionSuccess(user));
    yield call(createSessionSuccessSaga);
    onSuccess && onSuccess();
  } catch (error) {
    const errorMessage = getErrorMessage(error?.response?.data?.status_code);
    yield put(createAuthSessionFail(CreateResponseError(errorMessage)));
    onError && onError();
  }
}

function* createSessionSuccessSaga() {
  yield call(NavigationService.navigate, routeName.HomeStack);
}

export function* logOutSaga() {
  NavigationService.navigate(routeName.AuthStack);
}
