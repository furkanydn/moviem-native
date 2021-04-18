import {NetInfoState} from '@react-native-community/netinfo';
import {AnyAction} from 'redux';
import * as networkConst from './constans';
import {ReDispatchConfig} from './type';

// Dışarıya Aktarılacak İzleme Bileşenleri
export const startNetworkMonitoring = () =>
  <const>{type: networkConst.START_NETWORK_MONITORING};

export const stopNetworkMonitoring = () =>
  <const>{type: networkConst.STOP_NETWORK_MONITORING};

export const checkNetworkMonitoring = () =>
  <const>{type: networkConst.CHECK_NETWORK_CONNECTION};

export const checkNetworkStateChanged = (checkNetworkState: NetInfoState) =>
  <const>{type: networkConst.NETWORK_STATE_CHANGED, checkNetworkState};

export const handleNetworkReduxError = (
  error: any,
  reDispatchAction: AnyAction,
  reDispatchConfig: ReDispatchConfig = {},
) =>
  <const>{
    type: networkConst.HANDLE_NETWORK_REDUX_ERROR,
    error,
    reDispatchAction,
    reDispatchConfig,
  };

export const checkNetworkErrorsResolve = () =>
  <const>{type: networkConst.NETWORK_REDUX_ERRORS_RESOLVED};

export const clearReduxActionFromQueue = (clearTypes: string | string[]) =>
  <const>{type: networkConst.CLEAR_REDUX_ACTIONS_FROM_QUEUE, clearTypes};

// Dışarıya Aktarılacak Özellik Bileşenleri

export interface StartNetworkMonitoring
  extends ReturnType<typeof startNetworkMonitoring> {}
export interface StopNetworkMonitoring
  extends ReturnType<typeof stopNetworkMonitoring> {}
export interface CheckNetworkMonitoring
  extends ReturnType<typeof checkNetworkMonitoring> {}
export interface CheckNetworkStateChanged
  extends ReturnType<typeof checkNetworkStateChanged> {}
export interface HandleNetworkReduxError
  extends ReturnType<typeof handleNetworkReduxError> {}
export interface CheckNetworkReduxErrorResolve
  extends ReturnType<typeof checkNetworkErrorsResolve> {}
export interface ClearReduxActionFromQueue
  extends ReturnType<typeof clearReduxActionFromQueue> {}

export type NetworkActions =
  | StartNetworkMonitoring
  | StopNetworkMonitoring
  | CheckNetworkMonitoring
  | CheckNetworkStateChanged
  | HandleNetworkReduxError
  | CheckNetworkReduxErrorResolve
  | ClearReduxActionFromQueue;
