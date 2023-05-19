import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useMutateRequest } from './useMutateRequest';
import { useAuthContext } from '@lizards-inc-fe/auth';

interface IGetRequest<Params> {
  url: string;
  params?: Params;
}

export const useGetRequest = <Data = unknown, Error = unknown, Params = unknown>({ url }: IGetRequest<Params>) => {
  const { authenticated } = useAuthContext();
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: ApiUrl,
    url: url,
    method: 'GET',
  };

  return useRequest<Data, Error>(authenticated ? getRequestConfig : null);
};

export const useMutateGetRequest = <Data = unknown, Params = unknown, Error = unknown>({
  url,
  params,
}: IGetRequest<Params>) => {
  const { authenticated } = useAuthContext();
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: ApiUrl,
    url: url,
    method: 'GET',
  };

  if (params) {
    getRequestConfig.params = params;
  }

  return useMutateRequest<Data, Error>(authenticated ? getRequestConfig : null);
};
