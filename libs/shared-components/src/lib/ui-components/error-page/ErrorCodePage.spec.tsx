import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorCodePage } from './ErrorCodePage';

describe('ErrorCodePage', () => {
  beforeAll(() => {
    // mock the localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('renders default error page for unknown error codes', () => {
    render(<ErrorCodePage errorCode={999} />);

    expect(screen.getByText('Error HMMMMMMM')).toBeTruthy();
    expect(
      screen.getByText(
        "We haven't seen this error message, so take your time and appreciate that you found it! We are sure you had a long journey until here, therefore we encourage you to pet the lizard below (it feels relaxing in these tough times)."
      )
    ).toBeTruthy();
    expect(screen.queryByRole('button')).not.toBeTruthy();
  });

  it('renders correct error page for error code 400', () => {
    render(<ErrorCodePage errorCode={400} />);

    expect(screen.getByText('Error 400 - Something Bad Happened')).toBeTruthy();
    expect(
      screen.getByText('There was a problem processing the request. Please reload the page and try again!')
    ).toBeTruthy();
    expect(screen.queryByRole('button')).not.toBeTruthy();
  });

  it('renders correct error page for error code 401', () => {
    render(<ErrorCodePage errorCode={401} />);

    expect(screen.getByText("Error 401 - We don't know who you are")).toBeTruthy();
    expect(
      screen.getByText(
        "It looks like you are not appropriately logged in. Try to sign out and sign in again. If that doesn't help, press this button for a hard reset:"
      )
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Hard Reset' })).toBeTruthy();
  });

  it('triggers navigation and clears localStorage on button click for error code 401', () => {
    render(<ErrorCodePage errorCode={401} />);
    const button = screen.getByRole('button', { name: 'Hard Reset' });

    fireEvent.click(button);

    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('renders correct error page for error code 403', () => {
    render(<ErrorCodePage errorCode={403} />);

    expect(screen.getByText('Error 403 - You Shall Not Pass')).toBeTruthy();
    expect(
      screen.getByText(
        "It looks like you don't have access to this page. If you think you should have permission, please contact the administrators."
      )
    ).toBeTruthy();
    expect(screen.queryByRole('button')).not.toBeTruthy();
  });

  it('renders correct error page for error code 404', () => {
    render(<ErrorCodePage errorCode={404} />);

    expect(screen.getByText('Error 404 - Page Not Found')).toBeTruthy();
    expect(
      screen.getByText('Looks like this website does not exist. Please use the navigation bar to navigate to a page.')
    ).toBeTruthy();
    expect(screen.queryByRole('button')).not.toBeTruthy();
  });

  it('renders correct error page for error code 500', () => {
    render(<ErrorCodePage errorCode={500} />);

    expect(screen.getByText('Error 500 - Internal Server Server')).toBeTruthy();
    expect(
      screen.getByText(
        'This error is on us! We have saved the error details for later investigation. Until we fix it, try to refresh the page to see if it was a one-time error.'
      )
    ).toBeTruthy();
    expect(screen.queryByRole('button')).not.toBeTruthy();
  });
});
