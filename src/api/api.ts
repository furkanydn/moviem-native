import axios, {AxiosError, AxiosResponse} from 'axios';
import {config} from '../config/config';
//import {createLogOutRequest} from '../redux/auth/action';
//import StoreService from '../redux/storeService';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 6000,
});

api.interceptors.request.use(
  requestConfig => {
    if (config.logNetworkMessage) {
      console.log('[Request interceptor]', requestConfig);
    }
    return requestConfig;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (config.logNetworkMessage) {
      console.log('[Response interceptor]', response);
    }
    return response;
  },
  (error: AxiosError) => {
    //StoreService Gelcek
    if (error?.response?.status === 401) {
      //
    }
    if (config.logNetworkMessage) {
      console.log('[Error interceptor]', error);
    }
    return Promise.reject(error);
  },
);

export default api;
