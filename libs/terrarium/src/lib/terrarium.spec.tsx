import { render } from '@testing-library/react';

import Terrarium from './terrarium';

describe('Terrarium', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Terrarium />);
    expect(baseElement).toBeTruthy();
  });
});
