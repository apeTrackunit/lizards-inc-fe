import { render } from '@testing-library/react';

import { LimitsAndBoundaries } from './LimitsAndBoundaries';

describe('LimitsAndBoundaries', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LimitsAndBoundaries />);
    expect(baseElement).toBeTruthy();
  });
});
