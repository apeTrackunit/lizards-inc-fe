import { render } from '@testing-library/react';

import { Home } from './Home';

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
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
