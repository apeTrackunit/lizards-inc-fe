import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useMutateRequest } from './useMutateRequest';
import { useAuthContext } from '@lizards-inc-fe/auth';
import { useMemo } from 'react';

interface IPostRequest<RequestBody, Params> {
  url: string;
  data?: RequestBody;
  params?: Params;
}
export const usePostRequest = <Data = unknown, RequestBody = unknown, Params = unknown, Error = unknown>({
  url,
  data,
  params,
}: IPostRequest<RequestBody, Params>) => {
  const { authenticated } = useAuthContext();

  const postRequestConfig: AxiosRequestConfig<RequestBody> = {
    baseURL: ApiUrl,
    url: url,
    method: 'POST',
  };

  if (data) {
    postRequestConfig.data = data;
  }

  if (params) {
    postRequestConfig.params = params;
  }

  const isException = useMemo(() => {
    return url === '/Authentication';
  }, [url]);

  return useMutateRequest<Data, Error>(authenticated || isException ? postRequestConfig : null);
};
