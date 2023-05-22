import { useParams } from 'react-router-dom';
import { ErrorCodePage } from '@lizards-inc-fe/shared-components';

export const ErrorParamsPage = () => {
  const { code } = useParams();

  return <ErrorCodePage errorCode={code ?? '0'} />;
};
