import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Notification } from './Notification';
import { usePutRequest } from '@lizards-inc-fe/fetcher';

// Mock the usePutRequest hook
jest.mock('@lizards-inc-fe/fetcher', () => ({
  // @ts-ignore
  usePutRequest: jest.fn(() => ({ trigger: jest.fn(), response: { status: 200 } })),
}));

describe('Notification component', () => {
  const mockNotification = {
    id: '1',
    dateTime: new Date(),
    message: 'Test notification',
    status: true,
  };

  it('renders the notification message and timestamp', () => {
    const { getByText } = render(<Notification {...mockNotification} status={true} onMarkedAsSeen={jest.fn()} />);

    expect(getByText('Test notification')).toBeTruthy();
    expect(getByText('a few seconds ago')).toBeTruthy();
  });

  it('triggers the markAsSeen function on mouse enter', () => {
    const onMarkedAsSeen = jest.fn();
    const { baseElement } = render(
      <Notification {...mockNotification} status={true} onMarkedAsSeen={onMarkedAsSeen} />
    );

    fireEvent.mouseEnter(baseElement.firstChild as HTMLElement);

    expect(onMarkedAsSeen).toHaveBeenCalledTimes(1);
  });

  it('triggers the markAsSeen function on mouse click', () => {
    const onMarkedAsSeen = jest.fn();
    const { baseElement } = render(
      <Notification {...mockNotification} status={true} onMarkedAsSeen={onMarkedAsSeen} />
    );

    fireEvent.click(baseElement.firstChild as HTMLElement);

    expect(onMarkedAsSeen).toHaveBeenCalledTimes(1);
  });

  it('triggers the usePutRequest hook when status is false', async () => {
    const mockFunction = jest.fn();
    // @ts-ignore
    usePutRequest.mockImplementation(() => ({ trigger: mockFunction }));

    const { baseElement } = render(<Notification {...mockNotification} status={false} onMarkedAsSeen={jest.fn()} />);

    fireEvent.mouseEnter(baseElement.querySelector('.flex') as HTMLElement);

    await waitFor(
      () => {
        expect(mockFunction).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 }
    );
  });

  it('does not trigger the usePutRequest hook when status is true', async () => {
    const mockFunction = jest.fn();
    // @ts-ignore
    usePutRequest.mockImplementation(() => ({ trigger: mockFunction }));

    const { baseElement } = render(<Notification {...mockNotification} status={false} onMarkedAsSeen={jest.fn()} />);

    expect(baseElement).toBeTruthy();

    await waitFor(
      () => {
        expect(mockFunction).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });
});
