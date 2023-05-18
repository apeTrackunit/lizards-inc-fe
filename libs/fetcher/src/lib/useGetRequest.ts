import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useAuthContext } from '@lizards-inc-fe/auth';

interface IGetRequest {
  url: string;
}

export const useGetRequest = <Data = unknown, Error = unknown>({ url }: IGetRequest) => {
  const { authenticated } = useAuthContext();
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: ApiUrl,
    url: url,
    method: 'GET',
  };

  return useRequest<Data, Error>(authenticated ? getRequestConfig : null);
};
