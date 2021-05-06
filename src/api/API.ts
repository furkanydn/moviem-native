import axios, {AxiosError, AxiosResponse} from 'axios';
import {config} from '../config/config';
import {createLogOutRequest} from '../redux/auth/action';
import StoreService from '../redux/storeService';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 6000,
});

API.interceptors.request.use(
  requestConfig => {
    if (config.logNetworkMessage) {
      console.log('[Request interceptor]', requestConfig);
    }
    return requestConfig;
  },
  error => Promise.reject(error),
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    if (config.logNetworkMessage) {
      console.log('[Response interceptor]', response);
    }
    return response;
  },
  (error: AxiosError) => {
    // StoreService ile yetkisiz çıkış isteği giderse yönlendirme yapılacak.
    if (error?.response?.status === 401) {
      StoreService.dispatch(createLogOutRequest());
    }
    if (config.logNetworkMessage) {
      console.log('[Error interceptor]', error);
    }
    return Promise.reject(error);
  },
);

export default API;
