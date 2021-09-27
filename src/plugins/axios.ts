import axios, { AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

import { LoginRes } from '../types';
import cookie from '../utils/cookie';

const commonConfig: AxiosRequestConfig = {};

const administrationModuleConfig: AxiosRequestConfig = {
  ...commonConfig,
  baseURL: 'http://197.243.110.147:8080/administration-service/api',
};

const adminstrationAxios = axios.create(administrationModuleConfig);

const interceptAdminReq = (config: AxiosRequestConfig) => {
  const token = cookie.getCookie('jwt_info');
  if (token) {
    const jwtInfo: LoginRes = JSON.parse(token);
    config.headers.Authorization = `Bearer ${jwtInfo.token}`;
  }

  return config;
};

const interceptAdminResError = (error: any) => {
  const { data } = error.response;
  toast.error(data.message || data.error);

  return error.response;
};

adminstrationAxios.interceptors.request.use(interceptAdminReq);
adminstrationAxios.interceptors.response.use((config) => config, interceptAdminResError);

export { adminstrationAxios };