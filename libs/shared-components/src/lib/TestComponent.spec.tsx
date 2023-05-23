import { render } from '@testing-library/react';
import { TestComponent } from '@lizards-inc-fe/shared-components';

// this as example of testing a component
describe('TestComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestComponent />);
    expect(baseElement).toBeTruthy();
  });

  it('should display "Test Component"', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Test Component')).toBeTruthy();
  });
});
