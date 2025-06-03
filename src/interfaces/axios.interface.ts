import { AxiosRequestConfig } from 'axios';

import { HttpMethod } from '../types/http-method.type';

export interface IAxiosApi {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
};
