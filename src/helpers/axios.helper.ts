import axios from 'axios';

import { IAxiosApi } from '../interfaces/axios.interface';

export async function axiosApi({
  method,
  url,
  data,
  params,
  headers,
  config = {}
}: IAxiosApi) {
  try {
    const response = await axios.request({
      method,
      url,
      data,
      params,
      headers,
      ...config
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Erro ao realizar requisição pelo axios';

    throw {
      statusCode: status,
      message,
      code: 'axios_request_error'
    };
  }
};
