import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useMutateRequest } from './useMutateRequest';
import { useAuthContext } from '@lizards-inc-fe/auth';
import { useMemo } from 'react';

interface IDeleteRequest<RequestBody, Params> {
  url: string;
  data?: RequestBody;
  params?: Params;
}
export const useDeleteRequest = <Data = unknown, RequestBody = unknown, Params = unknown, Error = unknown>({
  url,
  data,
  params,
}: IDeleteRequest<RequestBody, Params>) => {
  const { authenticated } = useAuthContext();

  const deleteRequestConfig: AxiosRequestConfig<RequestBody> = {
    baseURL: ApiUrl,
    url: url,
    method: 'DELETE',
  };

  if (data) {
    deleteRequestConfig.data = data;
  }

  if (params) {
    deleteRequestConfig.params = params;
  }

  const isException = useMemo(() => {
    return url === '/Authentication';
  }, [url]);

  return useMutateRequest<Data, Error>(authenticated || isException ? deleteRequestConfig : null);
};
