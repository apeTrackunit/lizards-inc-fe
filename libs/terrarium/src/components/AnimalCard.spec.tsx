import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AnimalCard } from './AnimalCard';

jest.mock('@lizards-inc-fe/auth', () => ({
  useAuthContext: jest.fn().mockImplementation(() => ({ authenticated: true })),
}));

describe('AnimalCard', () => {
  const animal = {
    id: '1',
    name: 'NewLizard',
    species: 'snek',
    gender: 'F',
    dateOfBirth: new Date(),
    color: '#00FF00',
  };

  it('renders the animal card correctly', () => {
    const triggerRefresh = jest.fn();
    const { getByText } = render(<AnimalCard animal={animal} triggerRefresh={triggerRefresh} />);

    expect(getByText('NewLizard')).toBeTruthy();
    expect(getByText('Species: snek')).toBeTruthy();
    expect(getByText('Female')).toBeTruthy();
  });

  it('triggers delete and refresh when delete button is clicked', () => {
    const triggerRefresh = jest.fn();
    const { getByTestId } = render(<AnimalCard animal={animal} triggerRefresh={triggerRefresh} />);

    const deleteButton = getByTestId('animal-delete-button');
    fireEvent.click(deleteButton);

    expect(triggerRefresh).toHaveBeenCalledTimes(1);
  });
});
