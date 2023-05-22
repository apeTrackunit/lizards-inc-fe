import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useAuthContext } from '@lizards-inc-fe/auth';

interface IGetRequest<Params> {
  url: string;
  params?: Params;
}

export const useGetRequest = <Data = unknown, Error = unknown, Params = unknown>({
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

  return useRequest<Data, Error>(authenticated ? getRequestConfig : null);
};
