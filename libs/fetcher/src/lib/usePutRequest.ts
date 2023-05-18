import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useMutateRequest } from './useMutateRequest';
import { useAuthContext } from '@lizards-inc-fe/auth';

interface IPutRequest<RequestBody, Params> {
  url: string;
  data?: RequestBody;
  params?: Params;
}
export const usePutRequest = <Data = unknown, RequestBody = unknown, Params = unknown, Error = unknown>({
  url,
  data,
  params,
}: IPutRequest<RequestBody, Params>) => {
  const { authenticated } = useAuthContext();

  const putRequestConfig: AxiosRequestConfig<RequestBody> = {
    baseURL: ApiUrl,
    url: url,
    method: 'PUT',
  };

  if (data) {
    putRequestConfig.data = data;
  }

  if (params) {
    putRequestConfig.params = params;
  }

  return useMutateRequest<Data, Error>(authenticated ? putRequestConfig : null);
};
