import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useMutateRequest } from './useMutateRequest';

interface IGetRequest<Params> {
  url: string;
  params?: Params;
}

export const useGetRequest = <Data = unknown, Error = unknown, Params = unknown>({ url }: IGetRequest<Params>) => {
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: ApiUrl,
    url: url,
    method: 'GET',
  };

  return useRequest<Data, Error>(getRequestConfig);
};

export const useMutateGetRequest = <Data = unknown, Params = unknown, Error = unknown>({
  url,
  params,
}: IGetRequest<Params>) => {
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: ApiUrl,
    url: url,
    method: 'GET',
  };

  if (params) {
    getRequestConfig.params = params;
  }

  return useMutateRequest<Data, Error>(getRequestConfig);
};
