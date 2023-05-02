import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';

interface IGetRequest {
  url: string;
}

export const useGetRequest = <Data = unknown, Error = unknown>({ url }: IGetRequest) => {
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: 'https://localhost:44308/',
    url: url,
    method: 'GET',
  };

  return useRequest<Data, Error>(getRequestConfig);
};
