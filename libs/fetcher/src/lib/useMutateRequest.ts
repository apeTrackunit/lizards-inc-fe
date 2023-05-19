import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import useSWRMutation, { SWRMutationConfiguration, SWRMutationResponse } from 'swr/mutation';

export type Request = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRMutationResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'error' | 'isMutating' | 'trigger' | 'reset'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRMutationConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
  fallbackData?: Data;
}

export function useMutateRequest<Data = unknown, Error = unknown>(
  request: Request | null
  //{ fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isMutating,
    trigger,
    reset,
  } = useSWRMutation<AxiosResponse<Data>, AxiosError<Error>>(
    request,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => axios.request<Data>(request!)
    /*{
      ...config,
      fallbackData:
        fallbackData &&
        ({
          status: 200,
          statusText: 'InitialData',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          config: request!,
          headers: {},
          data: fallbackData,
        } as AxiosResponse<Data>),
    }*/
  );

  return {
    data: response && response.data,
    response,
    error,
    isMutating,
    reset,
    trigger,
  };
}
