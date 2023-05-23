import { useRequest } from './useRequest';
import { AxiosRequestConfig } from 'axios';
import { ApiUrl } from './ApiUrl';
import { useAuthContext } from '@lizards-inc-fe/auth';
import { useRedirectToError } from '@lizards-inc-fe/shared-components';
import { useEffect } from 'react';

interface IGetRequest<Params> {
  url: string;
  params?: Params;
}

export const useGetRequest = <Data = unknown, Error = unknown, Params = unknown>({
  url,
  params,
}: IGetRequest<Params>) => {
  const { authenticated } = useAuthContext();
  const { triggerErrorRedirect } = useRedirectToError();

  const getRequestConfig: AxiosRequestConfig = {
    baseURL: ApiUrl,
    url: url,
    method: 'GET',
  };

  if (params) {
    getRequestConfig.params = params;
  }

  const response = useRequest<Data, Error>(authenticated ? getRequestConfig : null);

  useEffect(() => {
    if (response.error?.response?.status) {
      triggerErrorRedirect(response.error?.response?.status);
    }
  }, [response]);

  return response;
};
