import React from 'react';
import { render } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  test('renders title and description correctly', () => {
    const title = 'Error Title';
    const description = 'Error Description';
    const { getByText } = render(<ErrorPage title={title} description={description} />);

    expect(getByText(title)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
  });

  test('renders extra element when provided', () => {
    const extraElement = <div data-testid="extra-element">Extra Element</div>;
    const { getByTestId } = render(
      <ErrorPage title="Error" description="Error Description" extraElement={extraElement} />
    );

    expect(getByTestId('extra-element')).toBeTruthy();
  });

  test('renders error logo', () => {
    const { getByAltText } = render(<ErrorPage title="Error" description="Error Description" />);
    const errorLogo = getByAltText('error-logo');

    expect(errorLogo).toBeTruthy();
    expect(errorLogo.getAttribute('src')).toEqual('error-logo.png');
  });
});
