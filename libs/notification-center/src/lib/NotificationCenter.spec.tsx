import { AuthProvider } from '@lizards-inc-fe/auth';
import { render } from '@testing-library/react';

import { NotificationCenter } from './NotificationCenter';

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
