import axios from 'axios';
import qs from 'query-string';
// declare global {
//   module 'axios' {
//     export interface AxiosResponse<T = any> extends Promise<T> {}
//   }

// }
const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://funiverse.world:30000',
  paramsSerializer: { serialize: (params) => qs.stringify(params) },
  // baseURL: 'http://dev.funiverse.world/api',
  proxy: {
    host: 'http://localhost',
    port: 3001,
  },
  // proxy: {
  //   // protocol: 'http',
  //   host: 'http://localhost',
  //   port: 3001,
  //   // auth: {
  //   //   username: 'mikeymike',
  //   //   password: 'rapunz3l'
  //   // }
  // },
});
axiosClient.interceptors.request.use(
  async (config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {},
);
axiosClient.interceptors.response.use((response) => {
  if (response.headers.location) {
    // return axiosClient.get(response.headers.location);
  }
  return response?.data;
});

export default axiosClient;
