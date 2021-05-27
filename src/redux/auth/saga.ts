import {AxiosResponse} from 'axios';
import {call, put} from 'redux-saga/effects';

// Yazılan bileşenler
import {
  CreateAuthenticatedSessionApiResponse,
  createAuthSessionAPI,
  createGuestSessionAPI,
  CreateGuestSessionApiResponse,
  createRequestTokenAPI,
  CreateRequestTokenApiResponse,
  getAccountDetailAPI,
  GetAccountDetailsApiResponse,
  validateUserCredentialAPI,
} from '../../api/auth';
import {getErrorMessage} from '../../api/error';
import {ToastMessage} from '../../components/index';
import NavigationService from '../../routes/NavigationService';
import {routeName} from '../../routes/routeName';
import {CreateResponseError} from '../../utils/error';
import {createAuthUserAccountData} from '../../utils/user';
import {
  createAuthSessionFail,
  CreateAuthSessionRequest,
  createAuthSessionSuccess,
  createGuestSessionFail,
  CreateGuestSessionRequest,
  createGuestSessionSuccess,
} from './action';

// Bileşen
export function* createGuestSessionSaga({
  oError,
  oSuccess,
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
    oSuccess && oSuccess();
  } catch (error) {
    ToastMessage.showMessage('Something went wrong. \nPlease try again later.');
    yield put(createGuestSessionFail(CreateResponseError(error.message)));
    oError && oError();
  }
}

export function* createAuthSessionSaga({
  username,
  password,
  oError,
  oSuccess,
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
    oSuccess && oSuccess();
  } catch (error) {
    const errorMessage = getErrorMessage(error?.response?.data?.status_code);
    yield put(createAuthSessionFail(CreateResponseError(errorMessage)));
    oError && oError();
  }
}

function* createSessionSuccessSaga() {
  yield call(NavigationService.navigate, routeName.HomeStack);
}

export function* logOutSaga() {
  NavigationService.navigate(routeName.AuthStack);
}
