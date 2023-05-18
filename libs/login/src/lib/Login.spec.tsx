import { render } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '@lizards-inc-fe/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render the card and components successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
        </Routes>
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
  });
});
