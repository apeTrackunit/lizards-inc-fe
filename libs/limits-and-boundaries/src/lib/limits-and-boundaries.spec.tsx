import { render } from '@testing-library/react';

import {LimitsAndBoundaries} from './limits-and-boundaries';

describe('LimitsAndBoundaries', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LimitsAndBoundaries />);
    expect(baseElement).toBeTruthy();
  });
});
