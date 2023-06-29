import { Button, Card, Popover } from 'antd';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { usePostRequest } from '@lizards-inc-fe/fetcher';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorPage, RoutingTable } from '@lizards-inc-fe/shared-components';
import { AuthServerResponse, useAuthContext } from '@lizards-inc-fe/auth';
import LoginChameleon from './assets/chamelion-min.png';
import Vine from './assets/vine.png';
import LoginLizard from './assets/lizard-min.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface IAuthServerRequest {
  code: string;
  isDevSource: boolean;
}
export const Login = () => {
  const [codeResponse, setCodeResponse] = useState<CodeResponse>();
  const [isError, setError] = useState(false);

  const { login: authLogin } = useAuthContext();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: response => {
      setCodeResponse(response);
    },
    flow: 'auth-code',
    include_granted_scopes: false,
    ux_mode: 'popup',
  });

  const { data, isMutating, trigger, error } = usePostRequest<AuthServerResponse, IAuthServerRequest>({
    url: '/Authentication',
    data: {
      code: codeResponse?.code ?? '',
      isDevSource: process.env.NX_ENVIRONMENT === 'dev',
    },
    autoErrorRedirect: false,
  });

  useEffect(() => {
    if (codeResponse?.code) {
      trigger().catch(() => setError(true));
    }
  }, [codeResponse, trigger]);

  useEffect(() => {
    if (data) {
      authLogin(data);
      navigate(RoutingTable.root);
    }
  }, [data, authLogin, navigate]);

  if (isError) {
    return (
      <div className={'h-screen flex items-center justify-center'}>
        <ErrorPage
          title={`Error ${error?.response?.status} - Login Error`}
          description={
            'It looks like we have encountered an error during login. If the error persists after many attempts, ' +
            'then please contact the developer team.'
          }
          extraElement={
            <Button onClick={() => setError(false)} data-testid={'back-to-login'}>
              Back to login
            </Button>
          }
        />
      </div>
    );
  }

  const mockDisclaimer = (
      <span>
        ReptiMate was created for a <b>Semester Project by Adam Petříček, Gabriel Horžić, Gergő Nádor and Sofia Augustínová</b>.
        <br/>
        The Backend was hosted on Google Cloud with Google Credits provided by the school.
        <br/>
        We mocked the backend in order to help the implementation during the development phase.
        <br/>
        Since we have run out of Credits, we have decided to <b>toggle the Backend Mocking on in the published
        website as well, therefore some of the data might not make sense.</b>
        <br/>
        Have a nice day!
      </span>
  )

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Card
        id={'login-card'}
        bordered={false}
        className={
          'flex flex-col justify-center items-center w-96 h-[22rem] bg-white drop-shadow-md border border-black/30'
        }
      >
        <div
          id={'icon-card'}
          className={'absolute top-0 left-0 tra w-full -translate-y-1/2 bg-transparent flex justify-center'}
        >
          <div className="h-40 w-40 bg-lime-100 rounded-[100%] overflow-hidden border border-black/30">
            <img src={LoginChameleon} alt={'lizard img'} className={'-translate-x-3 translate-y-3'} />
          </div>
        </div>

        <div className={'m-1 flex justify-center pb-8'}>
          <div className={'text-4xl flex justify-center items-center gap-2'}>
            ReptiMate
            <Popover content={mockDisclaimer} title="Disclaimer" trigger="hover">
              <ExclamationCircleOutlined rev={undefined} height={60} width={60} className={'text-red-500'} />
            </Popover>

          </div>
        </div>

        <button
          id={'login-button'}
          onClick={login}
          color={'black'}
          className={'w-72 h-10 bg-lime-100 hover:bg-lime-200 hover:text-black rounded-md border border-black/20 z-10'}
        >
          {!isMutating ? (
            <div className={'flex justify-around'}>
              <img src={LoginLizard} alt={'Small gecko'} className={'w-8 h-8'} />
              <div className={'font-medium justify-self-center flex items-center'}>CONTINUE WITH GOOGLE</div>
              <img src={LoginLizard} alt={'Small gecko'} className={'w-8 h-8 invisible'} />
            </div>
          ) : (
            'Loading...'
          )}
        </button>
        <div id={'vine-card'} className={'absolute top-[13rem] left-0 -z-10'}>
          <div className={'z-0'}>
            <img src={Vine} alt={'Vine img'} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
