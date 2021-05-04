import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {delay, put, select} from 'redux-saga/effects';
import StoreService from '../storeService';
import {
  clearReduxActionFromQueue,
  HandleNetworkReduxError,
  StartNetworkMonitoring,
  checkNetworkErrorsResolve,
  checkNetworkStateChanged,
  StopNetworkMonitoring,
} from './action';
import {
  failedNetworkRequestQueueSelect,
  isInternetReachableSelect,
} from './selector';
import {FailedRequest} from './type';

//  Yardımcı Nesneler
let unSubscribe: NetInfoSubscription;

export function* startNetworkMonitorSaga({}: StartNetworkMonitoring) {
  unSubscribe = NetInfo.addEventListener(state => {
    StoreService.dispatch(checkNetworkStateChanged(state));
  });
}

export function* stopNetworkMonitorSaga({}: StopNetworkMonitoring) {
  unSubscribe && unSubscribe();
}

// Redux Saga için yapılan başarısız ağ isteğini yeniden düzenlemek içi bazı mekanizmalar oluşturmaya çalıştım.
// Bu sorun için en iyi çözüm değildir belki de, bazı hackleme yöntemleri kullanım durumlarını engelleyebilir.
export function* resolveFailedRequestSaga() {
  const repeatT = 2000;

  while (true) {
    yield delay(repeatT);

    const isInternet: boolean = yield select(isInternetReachableSelect);
    if (isInternet) {
      const failedReqQueue: FailedRequest[] = yield select(
        failedNetworkRequestQueueSelect,
      );
      if (failedReqQueue.length > 0) {
        let i = 0;
        for (i; i < failedReqQueue.length; i++) {
          const failedRequest = failedReqQueue[i];
          yield put(failedRequest.action);
        }
        yield put(checkNetworkErrorsResolve());
      }
    }
  }
}

export function* handleNetworkReduxErrorSaga({
  reDispatchConfig,
}: HandleNetworkReduxError) {
  const {clearActionFromQueue} = reDispatchConfig;
  if (clearActionFromQueue) {
    yield put(clearReduxActionFromQueue(clearActionFromQueue));
  }
}
