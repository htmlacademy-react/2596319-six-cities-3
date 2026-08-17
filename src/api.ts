import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './const/const';
import { getToken } from './token';

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

  return api;
}
