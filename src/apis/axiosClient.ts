import axios from 'axios';
import qs from 'query-string';
import { appCookies } from 'src/utils';
// declare global {
//   module 'axios' {
//     export interface AxiosResponse<T = any> extends Promise<T> {}
//   }

// }
const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.REACT_APP_BASE_API,
  paramsSerializer: { serialize: (params) => qs.stringify(params) },
  // baseURL: 'http://dev.funiverse.world/api',
  timeout: 0,
  proxy: {
    host: 'http://localhost',
    port: 3001,
  },
});
axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = appCookies.getAccessToken();

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {},
);
axiosClient.interceptors.response.use((response) => {
  return response?.data;
});

export default axiosClient;
