import { AuthProvider } from '@lizards-inc-fe/auth';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { NotificationCenter } from './NotificationCenter';
import { useGetRequest } from '@lizards-inc-fe/fetcher';

jest.mock('@lizards-inc-fe/fetcher', () => ({
  useGetRequest: jest.fn(() => ({ data: [], isLoading: false, mutate: jest.fn() })),
  usePutRequest: jest.fn(() => ({ trigger: jest.fn() })),
}));

jest.mock('react-router-dom');

describe('NotificationCenter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <NotificationCenter />
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders the notification center button', () => {
    const { getByRole } = render(<NotificationCenter />);
    const notificationButton = getByRole('button');

    expect(notificationButton).toBeTruthy();
  });

  it('displays loading spinner while data is being fetched', async () => {
    // @ts-ignore
    useGetRequest.mockImplementation(() => ({ data: undefined, isLoading: true, mutate: jest.fn() }));

    const { getByTestId, baseElement } = render(<NotificationCenter />);

    // open the popup
    fireEvent.click(baseElement.querySelector('button') as HTMLElement);

    const spinner = getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  it('displays "No data" when there are no notifications', () => {
    // @ts-ignore
    useGetRequest.mockImplementation(() => ({ data: [], isLoading: false, mutate: jest.fn() }));

    const { getByText, baseElement } = render(<NotificationCenter />);

    // open the popup
    fireEvent.click(baseElement.querySelector('button') as HTMLElement);

    const noDataText = getByText('No data');
    expect(noDataText).toBeTruthy();
  });

  it('renders the notification list inside the popover', async () => {
    const mockData = [
      {
        id: '1',
        dateTime: new Date(),
        message: 'Test notification 1',
        status: false,
      },
      {
        id: '2',
        dateTime: new Date(),
        message: 'Test notification 2',
        status: false,
      },
    ];
    // @ts-ignore
    useGetRequest.mockImplementation(() => ({ data: mockData, isLoading: false, mutate: jest.fn() }));

    const { getByText, baseElement } = render(<NotificationCenter />);

    // open the popup
    fireEvent.click(baseElement.querySelector('button') as HTMLElement);

    await waitFor(() => {
      expect(getByText('Test notification 1')).toBeTruthy();
      expect(getByText('Test notification 2')).toBeTruthy();
    });
  });
});
