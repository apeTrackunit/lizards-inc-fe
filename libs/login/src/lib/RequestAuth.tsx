import { ReactNode } from 'react';
import Login from './Login';
import { useAuthContext } from '@lizards-inc-fe/auth';

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
  const { authenticated } = useAuthContext();

  return authenticated ? <div>{children}</div> : <Login />;
};