import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useMutateRequest } from './useMutateRequest';
import { useAuthContext } from '@lizards-inc-fe/auth';
import { useEffect, useMemo } from 'react';
import { useRedirectToError } from '@lizards-inc-fe/shared-components';

interface IPostRequest<RequestBody, Params> {
  url: string;
  data?: RequestBody;
  params?: Params;
  autoErrorRedirect?: boolean;
}
export const usePostRequest = <Data = unknown, RequestBody = unknown, Params = unknown, Error = unknown>({
  url,
  data,
  params,
  autoErrorRedirect = true,
}: IPostRequest<RequestBody, Params>) => {
  const { authenticated } = useAuthContext();
  const { triggerErrorRedirect } = useRedirectToError();

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

  const response = useMutateRequest<Data, Error>(authenticated || isException ? postRequestConfig : null);

  useEffect(() => {
    if (response.error?.response?.status && autoErrorRedirect) {
      triggerErrorRedirect(response.error?.response?.status);
    }
  }, [response, autoErrorRedirect]);

  return response;
};
