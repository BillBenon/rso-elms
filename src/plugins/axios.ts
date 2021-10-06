import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import { LoginRes, Response } from '../types';
import cookie from '../utils/cookie';

const openRequests: string[] = ['/authentication/signin'];

const commonConfig: AxiosRequestConfig = {};

const administrationModuleConfig: AxiosRequestConfig = {
  ...commonConfig,
  baseURL: 'http://197.243.110.147:8080/administration-service/api',
};

const adminstrationAxios = axios.create(administrationModuleConfig);
const authIgnore: string[] = ['/'];

const interceptAdminReq = (config: AxiosRequestConfig) => {
  const token = cookie.getCookie('jwt_info');
  // when request is open no need to add bearer token
  if (!openRequests.find((link) => link === config.url)) {
    if (token) {
      const jwtInfo: LoginRes = JSON.parse(token);
      // @ts-ignore
      config.headers['Authorization'] = `Bearer ${jwtInfo.token}`;
    }
  }
  return config;
};

const interceptAdminResError = (error: Error | AxiosError<AxiosResponse<Response>>) => {
  if (axios.isAxiosError(error)) {
    const e = error?.response;

    if (e?.status === 401 && !authIgnore.includes(window.location.pathname)) {
      window.location.href = '/login';
    }

    if (import.meta.env.DEV) {
      if (e?.status === 400) toast.error(`Bad Request on, ${e.config.url}`);
      // @ts-ignore
      else toast.error((e?.data.message || e?.data?.data?.error) + '');
    }

    // unauthorized
    throw error;
  } else {
    console.log(error);
    return error;
  }
};

adminstrationAxios.interceptors.request.use(interceptAdminReq);
adminstrationAxios.interceptors.response.use((config) => config, interceptAdminResError);

export { adminstrationAxios };
