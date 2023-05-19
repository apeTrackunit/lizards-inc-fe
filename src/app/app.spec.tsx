import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { AuthProvider } from '@lizards-inc-fe/auth';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
