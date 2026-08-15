import axios from 'axios';
import { API_URL } from './const/const';

export function createApi() {
  const api = axios.create({
    baseURL: API_URL,
    timeout: 5000
  });

  return api;
}
