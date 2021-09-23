import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

import cookie from './cookie';

const commonConfig: AxiosRequestConfig = {};

const administrationModuleConfig: AxiosRequestConfig = {
  ...commonConfig,
  baseURL: 'http://197.243.110.147:8080/administration-service/api',
};

const adminstrationAxios = axios.create(administrationModuleConfig);

const interceptAdminReq = (config: AxiosRequestConfig) => {
  console.log(cookie.getCookie('jwt_token'));
  return config;
};

const interceptAdminResError = (error: any) => {
  const { data } = error.response;
  toast.error(data.message);
  // return Promise.reject(error);
};

adminstrationAxios.interceptors.request.use(interceptAdminReq);
adminstrationAxios.interceptors.response.use((config) => config, interceptAdminResError);

export { adminstrationAxios };
