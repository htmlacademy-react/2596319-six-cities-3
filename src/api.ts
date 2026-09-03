import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_URL, ServerConfig } from './const/const';
import { getToken } from './token';

export function createApi(
  onServerError?: () => void,
  onServerSuccess?: () => void
): AxiosInstance {
  const api = axios.create({
    baseURL: API_URL,
    timeout: ServerConfig.MaxResponseTimeout
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
    (response) => {
      onServerSuccess?.();
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status >= Number(ServerConfig.ErrorCode)) {
        onServerError?.();
      }

      return Promise.reject(error);
    }
  );

  return api;
}
