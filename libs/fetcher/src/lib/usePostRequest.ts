import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useMutateRequest } from './useMutateRequest';

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

  return useMutateRequest<Data, Error>(postRequestConfig);
};
