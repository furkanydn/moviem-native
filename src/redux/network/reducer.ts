import {isArray} from 'lodash';
import {isNetworkError, isServerError} from '../indexIE';
import * as networkConst from './constants';
import {FailedRequest} from './type';
import {isSameActionByType} from './utils';
import {
  ClearReduxActionFromQueue,
  HandleNetworkReduxError,
  NetworkActions,
  CheckNetworkReduxErrorResolve,
  CheckNetworkStateChanged,
} from './action';

// Durum Bileşenleri

export const initState = {
  isConnected: true,
  isInternetReachable: true,
  ipAddress: undefined as string | undefined,
  failRequestQueue: [] as FailedRequest[],
};
type NetworkStateType = typeof initState;
export interface NetworkState extends NetworkStateType {}

// Bileşenleri Döndüren Fonksiyonlar

const clearReduxActionFromQueue = (
  state: NetworkState,
  action: ClearReduxActionFromQueue,
): NetworkState => {
  const {clearTypes} = action;
  const typeArray = isArray(clearTypes) ? clearTypes : [clearTypes];

  return {
    ...state,
    failRequestQueue: state.failRequestQueue.filter(
      failRequest => !typeArray.includes(failRequest.action.type),
    ),
  };
};

const handleNetworkReduxError = (
  state: NetworkState,
  action: HandleNetworkReduxError,
): NetworkState => {
  const {error, reDispatchAction, reDispatchConfig} = action;
  const {sameAction: sameActionConfig} = reDispatchConfig;

  if (!isNetworkError(error) && !isServerError(error)) {
    return state;
  }

  const isSameAction = sameActionConfig || isSameActionByType;
  const filterFailRequestQueue = state.failRequestQueue.filter(
    failed => !isSameAction(failed.action, reDispatchAction),
  );

  return {
    ...state,
    failRequestQueue: [
      ...filterFailRequestQueue,
      {action: reDispatchAction, error},
    ],
  };
};

const checkNetworkReduxErrorResolve = (
  state: NetworkState,
  {}: CheckNetworkReduxErrorResolve,
): NetworkState => ({...state, failRequestQueue: []});

const checkNetworkStateChanged = (
  state: NetworkState,
  action: CheckNetworkStateChanged,
): {
  failRequestQueue: FailedRequest[];
  isConnected: null | false | true;
  isInternetReachable: boolean;
  ipAddress: any;
} => {
  const {checkNetworkState} = action;
  const {isConnected, isInternetReachable, details} = checkNetworkState;
  // @ts-ignore networkState.details Doğru typescript desteği yoktur
  //https://github.com/react-native-netinfo/react-native-netinfo/issues/413
  const ipAddress = details?.ipAddress;
  const internetReachableUpdate =
    isInternetReachable ?? state.isInternetReachable;

  return {
    ...state,
    isConnected,
    isInternetReachable: internetReachableUpdate,
    ipAddress,
  };
};

const networkReducer = (
  state: NetworkState | undefined = initState,
  action: NetworkActions,
): NetworkState => {
  switch (action.type) {
    case networkConst.CLEAR_REDUX_ACTIONS_FROM_QUEUE:
      return clearReduxActionFromQueue(state, action);
    case networkConst.HANDLE_NETWORK_REDUX_ERROR:
      return handleNetworkReduxError(state, action);
    case networkConst.NETWORK_STATE_CHANGED:
      return <NetworkState>checkNetworkStateChanged(state, action);
    case networkConst.NETWORK_REDUX_ERRORS_RESOLVED:
      return checkNetworkReduxErrorResolve(state, action);
    default:
      return state;
  }
};

export default networkReducer;
