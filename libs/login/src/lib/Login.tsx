import { Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { usePostRequest } from '@lizards-inc-fe/fetcher';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutingTable } from '@lizards-inc-fe/shared-components';
import { AuthServerResponse, useAuthContext } from '@lizards-inc-fe/auth';

interface IAuthServerRequest {
  code: string;
}
export const Login = () => {
  const [codeResponse, setCodeResponse] = useState<CodeResponse>();

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

  const { data, isMutating, trigger } = usePostRequest<AuthServerResponse, IAuthServerRequest>({
    url: '/Authentication',
    data: { code: codeResponse?.code ?? '' },
  });

  useEffect(() => {
    if (codeResponse?.code) {
      trigger();
    }
  }, [codeResponse, trigger]);

  useEffect(() => {
    if (data) {
      authLogin(data);
      navigate(RoutingTable.root);
    }
  }, [data, authLogin, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-white relative m-8">
      <Card
        id={'login-card'}
        bordered={false}
        style={{
          width: 400,
          height: 400,
          backgroundColor: '#84fa84',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          filter: 'drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.5))',
        }}
      >
        <Card
          bordered={false}
          id={'icon-card'}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'hidden',
            backgroundColor: '#5DDE5D',
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <UserOutlined id={'user-icon'} style={{ fontSize: '120px', backgroundColor: '#5DDE5D' }} />
          </div>
        </Card>

        <Typography.Title
          id={'card-title'}
          level={1}
          style={{ textAlign: 'center', marginBottom: '40px', marginTop: '-80px', color: '#000000' }}
        >
          ReptiMate
        </Typography.Title>
        <Button
          id={'login-button'}
          style={{
            width: '100%',
            height: '60px',
            backgroundColor: '#2fbb2f',
            color: '#FFFFFF',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#084908';
            (e.currentTarget as HTMLButtonElement).style.border = 'none';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2fbb2f';
          }}
          onClick={login}
        >
          {!isMutating ? 'LOGIN WITH GOOGLE' : 'Loading...'}
        </Button>
      </Card>
    </div>
  );
};

export default Login;
