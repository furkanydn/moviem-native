import {createSelector} from 'reselect';
import {RootState} from '../type';

// Bileşenler
export const networkStateSelect = (state: RootState) => state.network;

export const networkConnectedSelect = createSelector(
  networkStateSelect,
  network => network.isConnected,
);

export const isInternetReachableSelect = createSelector(
  networkStateSelect,
  network => network.isInternetReachable,
);

export const networkIpAddressSelect = createSelector(
  networkStateSelect,
  network => network.ipAddress,
);

export const failedNetworkRequestQueueSelect = createSelector(
  networkStateSelect,
  network => network.failRequestQueue,
);
