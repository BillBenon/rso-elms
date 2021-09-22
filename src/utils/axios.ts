import axios, { AxiosRequestConfig } from 'axios';

const commonConfig: AxiosRequestConfig = {};

const administrationModuleConfig: AxiosRequestConfig = {
  ...commonConfig,
  baseURL: 'http://197.243.110.147:8080/administration-service/api',
};

export const adminstrationAxios = axios.create(administrationModuleConfig);
