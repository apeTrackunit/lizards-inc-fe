import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';

interface IGetRequest {
  url: string;
}

export const useGetRequest = <Data = unknown, Error = unknown>({ url }: IGetRequest) => {
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: 'https://localhost:7253/',
    url: url,
    method: 'GET',
  };

  return useRequest<Data, Error>(getRequestConfig);
};
