import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from "./ApiUrl";

interface IGetRequest {
  url: string;
}

export const useGetRequest = <Data = unknown, Error = unknown>({ url }: IGetRequest) => {
  const getRequestConfig: AxiosRequestConfig = {
    baseURL: ApiUrl,
    url: url,
    method: 'GET',
  };

  return useRequest<Data, Error>(getRequestConfig);
};
