import { ErrorPage, ErrorPageProps } from './ErrorPage';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useRedirectToError = () => {
  const navigate = useNavigate();
  return { triggerErrorRedirect: (errorCode: number) => navigate('/error/' + errorCode.toString()) };
};

interface ErrorCodePageProps {
  errorCode: number | string;
}

interface ErrorMessages {
  [id: string]: ErrorPageProps;
}

export const ErrorCodePage = ({ errorCode }: ErrorCodePageProps) => {
  const errorPages: ErrorMessages = {
    '0': {
      // default
      title: 'Error HMMMMMMM',
      description:
        "We haven't seen this error message, so take your time and appreciate that you found it! We are sure you had a long journey until here, therefore we encourage you to pet the lizard below (it feels relaxing in these tough times).",
    },
    '400': {
      title: 'Error 400 - Something Bad Happened',
      description: 'There was a problem processing the request. Please reload the page and try again!',
    },
    '401': {
      title: "Error 401 - We don't know who you are",
      description:
        "It looks like you are not appropriately logged in. Try to sign out and sign in again. If that doesn't help, press this button for a hard reset: ",
      extraElement: (
        <Button danger={true} type={'primary'} onClick={() => localStorage.clear()}>
          Hard Reset
        </Button>
      ),
    },
    '403': {
      title: 'Error 403 - You Shall Not Pass',
      description:
        "It looks like you don't have access to this page. If you think you should have permission, please contact the administrators.",
    },
    '404': {
      title: 'Error 404 - Page Not Found',
      description: 'Looks like this website does not exist. Please use the navigation bar to navigate to a page.',
    },
    '500': {
      title: 'Error 500 - Internal Server Server',
      description:
        'This error is on us! We have saved the error details for later investigation. Until we fix it, try to refresh the page to see if it was a one-time error.',
    },
  };

  let errorProps = errorCode.toString() in errorPages ? errorPages[errorCode.toString()] : errorPages['0'];

  return (
    <ErrorPage title={errorProps.title} description={errorProps.description} extraElement={errorProps.extraElement} />
  );
};
