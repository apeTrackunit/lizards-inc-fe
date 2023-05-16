import { ReactNode } from 'react';
import { useAuthContext } from './AuthProvider';
import Login from './Login';

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
  const { authenticated } = useAuthContext();

  return authenticated ? <div>{children}</div> : <Login />;
};
