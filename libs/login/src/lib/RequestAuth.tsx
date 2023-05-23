import { ReactNode, useEffect, useState } from 'react';
import Login from './Login';
import { useAuthContext } from '@lizards-inc-fe/auth';
import { LoginLoading } from './LoginLoading';

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps): JSX.Element => {
  const { authenticated } = useAuthContext();
  const [displayedView, setDisplayedView] = useState(<LoginLoading />);

  useEffect(() => {
    if (authenticated === undefined) {
      return;
    }

    if (sessionStorage['loading'] == 'played') {
      setDisplayedView(authenticated ? <div>{children}</div> : <Login />);
      return;
    }

    sessionStorage['loading'] = 'played';
    // waiting for the loading snake animation to end
    setTimeout(() => setDisplayedView(authenticated ? <div>{children}</div> : <Login />), 3000);
  }, [authenticated]);

  return displayedView;
};
