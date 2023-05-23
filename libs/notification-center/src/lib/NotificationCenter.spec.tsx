import { AuthProvider } from '@lizards-inc-fe/auth';
import { render } from '@testing-library/react';

import { NotificationCenter } from './NotificationCenter';

jest.mock('react-router-dom');

describe('NotificationCenter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <NotificationCenter />
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
