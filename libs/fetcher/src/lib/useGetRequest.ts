import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';

interface IGetRequest {
  url: string;
}

export const useGetRequest = <Data = unknown, Error = unknown>({ url }: IGetRequest) => {
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: 'https://pokeapi.co/api/v2',
    url: url,
    method: 'GET',
  };

  return useRequest<Data, Error>(getRequestConfig);
};
