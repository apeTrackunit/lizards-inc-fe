import { fireEvent, render, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import { AuthProvider, mockAuthLogin } from '@lizards-inc-fe/auth';
// @ts-ignore
import { loginFunction } from '@react-oauth/google';
import { usePostRequest } from '@lizards-inc-fe/fetcher';

jest.mock('@react-oauth/google', () => {
  const googleAuth = jest.requireActual('@react-oauth/google');
  const loginFunction = jest.fn(options =>
    options.onSuccess({
      code: 'test-code',
      scope: 'test-scope',
      state: 'test-state',
    })
  );

  return {
    ...googleAuth,
    useGoogleLogin: jest.fn(options => () => loginFunction(options)),
    loginFunction,
  };
});

jest.mock('@lizards-inc-fe/fetcher', () => ({
  usePostRequest: jest.fn().mockImplementation(() => ({
    data: undefined,
    isMutating: false,
    trigger: jest.fn(),
    error: undefined,
  })),
}));

jest.mock('@lizards-inc-fe/auth', () => {
  const authImpl = jest.requireActual('@lizards-inc-fe/auth');
  const mockAuthLogin = jest.fn();
  return {
    ...authImpl,
    useAuthContext: jest.fn().mockImplementation(() => ({
      login: mockAuthLogin,
    })),
    mockAuthLogin,
  };
});

describe('Login', () => {
  const authData = {
    access_token: 'test-access',
    expires_in: 11,
    id_token: 'test-id',
    refresh_token: 'test-refresh',
    scope: 'test-scope',
    token_type: 'test-token-type',
  };

  const errorResponse = {
    response: {
      status: 500,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the card and components successfully', () => {
    const { baseElement, getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
    const loginCard = baseElement.id.localeCompare('login-card');
    const loginTitle = baseElement.querySelector('.ant-typography');
    const loginIcon = baseElement.id.localeCompare('user-icon');
    const loginButton = baseElement.id.localeCompare('login-button');

    expect(loginCard).toBeTruthy();
    if (loginTitle == null) return;
    expect(loginTitle.textContent).toBe('ReptiMate');
    expect(loginButton).toBeTruthy();
    expect(loginIcon).toBeTruthy();

    expect(getByText('CONTINUE WITH GOOGLE')).toBeTruthy();
  });

  it('should call the google auth login', () => {
    // @ts-ignore
    usePostRequest.mockImplementation(() => {
      let data = undefined;

      return {
        data: data,
        isMutating: false,
        trigger: jest.fn().mockImplementation(() => new Promise(res => res((data = authData)))),
        error: undefined,
      };
    });

    const { baseElement } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const loginButton = baseElement.querySelector('button') as HTMLElement;

    fireEvent.click(loginButton);

    expect(loginFunction).toHaveBeenCalled();
  });

  it('should call the google auth login and then useAuthContext login', async () => {
    // @ts-ignore
    usePostRequest.mockImplementation(() => {
      return {
        data: authData,
        isMutating: false,
        trigger: jest.fn().mockImplementation(() => new Promise(res => res(1))),
        error: undefined,
      };
    });

    const { baseElement } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const loginButton = baseElement.querySelector('button') as HTMLElement;

    fireEvent.click(loginButton);

    expect(loginFunction).toHaveBeenCalled();

    await waitFor(() => {
      expect(mockAuthLogin).toHaveBeenCalled();
    });
  });

  it('should display "Loading..." when it is mutating', () => {
    // @ts-ignore
    usePostRequest.mockImplementation(() => {
      return {
        data: undefined,
        isMutating: true,
        trigger: jest.fn().mockImplementation(() => new Promise((res, rej) => rej(1))),
        error: errorResponse,
      };
    });

    const { getByText } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(() => getByText('CONTINUE WITH GOOGLE')).toThrowError();
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should display error message when there is an error with /Authentication', async () => {
    // @ts-ignore
    usePostRequest.mockImplementation(() => {
      return {
        data: undefined,
        isMutating: false,
        trigger: jest.fn().mockImplementation(() => new Promise((res, rej) => rej(1))),
        error: errorResponse,
      };
    });

    const { getByText, baseElement, getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const loginButton = baseElement.querySelector('button') as HTMLElement;

    fireEvent.click(loginButton);

    expect(loginFunction).toHaveBeenCalled();
    expect(mockAuthLogin).not.toHaveBeenCalled();

    // wait for the promise to finish
    await waitFor(() => {
      expect(getByText('Error 500 - Login Error')).toBeTruthy();
      expect(getByText('Back to login')).toBeTruthy();

      const backToLoginButton = getByTestId('back-to-login') as HTMLElement;
      expect(backToLoginButton).toBeTruthy();
    });
  });

  it("should go back to login when 'Back to login' button is pressed", async () => {
    // @ts-ignore
    usePostRequest.mockImplementation(() => {
      return {
        data: undefined,
        isMutating: false,
        trigger: jest.fn().mockImplementation(() => new Promise((res, rej) => rej(1))),
        error: errorResponse,
      };
    });

    const { getByText, baseElement, getByTestId } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const loginButton = baseElement.querySelector('button') as HTMLElement;

    fireEvent.click(loginButton);

    // wait for the promise to finish
    await waitFor(() => {
      expect(getByText('Error 500 - Login Error')).toBeTruthy();
    });

    expect(getByText('Back to login')).toBeTruthy();

    const backToLoginButton = getByTestId('back-to-login') as HTMLElement;
    expect(backToLoginButton).toBeTruthy();
    fireEvent.click(backToLoginButton);

    // wait for the new render
    expect(getByText('CONTINUE WITH GOOGLE')).toBeTruthy();
  });
});
