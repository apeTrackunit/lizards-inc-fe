import { render } from '@testing-library/react';

import { Home } from './Home';
import { AuthProvider } from '@lizards-inc-fe/auth';

describe('Home', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
