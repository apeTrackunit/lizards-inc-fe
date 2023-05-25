import { render } from '@testing-library/react';
import { ErrorParamsPage } from './ErrorParamsPage';
import { ErrorCodePage } from '@lizards-inc-fe/shared-components';
import { useParams } from 'react-router-dom';

jest.mock('@lizards-inc-fe/shared-components', () => ({
  ErrorCodePage: jest.fn(),
}));
jest.mock('react-router-dom');

describe('ErrorParamsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ErrorCodePage with code from useParams with error 404', () => {
    // @ts-ignore
    useParams.mockReturnValue({ code: '404' });

    render(<ErrorParamsPage />);

    expect(ErrorCodePage).toHaveBeenCalledWith({ errorCode: '404' }, {});
  });

  it('renders ErrorCodePage with code from useParams with error 401', () => {
    // @ts-ignore
    useParams.mockReturnValue({ code: '401' });

    render(<ErrorParamsPage />);

    expect(ErrorCodePage).toHaveBeenCalledWith({ errorCode: '401' }, {});
  });

  it('renders ErrorCodePage with default code when useParams returns undefined', () => {
    // @ts-ignore
    useParams.mockReturnValue({ code: '0' });

    render(<ErrorParamsPage />);

    expect(ErrorCodePage).toHaveBeenCalledWith({ errorCode: '0' }, {});
  });
});
