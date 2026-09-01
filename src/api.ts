import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './const/const';
import { getToken } from './token';
import { store } from './store/store';
import { setServerError } from './store/slices/data-slice';

export function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && error.response.status >= 500) {
        store.dispatch(setServerError(true));
      }

      return Promise.reject(error);
    }
  );

  return api;
}
