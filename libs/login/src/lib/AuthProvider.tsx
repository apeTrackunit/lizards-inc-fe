import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import axios from 'axios';

export interface AuthServerResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface IAuthContext {
  authenticated: boolean;
  login: (response: AuthServerResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface Props {
  children: ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(!!localStorage.getItem('auth-token'));

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth-token') ?? '{}') as AuthServerResponse;

    if (auth.id_token) {
      console.log('Token attached');
      setAuthenticated(true);
      axios.defaults.headers.common = {
        Authorization: `Bearer ${auth.id_token}`,
      };
    }
  }, []);

  const login = (response: AuthServerResponse) => {
    localStorage.setItem('auth-token', JSON.stringify(response));
    setAuthenticated(true);

    const auth = JSON.parse(localStorage.getItem('auth-token') ?? '') as AuthServerResponse;

    if (auth.id_token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${auth.id_token}`,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setAuthenticated(false);
    googleLogout();
    axios.defaults.headers.common = { Authorization: `` };
  };

  const value: IAuthContext = useMemo(() => ({ authenticated, login, logout }), [authenticated, login, logout]);

  return (
    <GoogleOAuthProvider clientId="756576377617-0t412r5o9fepmnsso6utp40vgbgdfipg.apps.googleusercontent.com">
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
