import { render } from '@testing-library/react';

import { NotificationCenter } from './NotificationCenter';

describe('NotificationCenter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationCenter />);
    expect(baseElement).toBeTruthy();
  });
});
