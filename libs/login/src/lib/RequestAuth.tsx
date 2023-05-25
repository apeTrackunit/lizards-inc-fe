import { ReactNode } from 'react';
import Login from './Login';
import { useAuthContext } from '@lizards-inc-fe/auth';

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
  const { authenticated } = useAuthContext();

  if (authenticated === undefined) {
    return <div></div>;
  }

  return authenticated ? <div>{children}</div> : <Login />;
};
