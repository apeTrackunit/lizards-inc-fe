import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AnimalCard } from './AnimalCard';

jest.mock('@lizards-inc-fe/auth', () => ({
  useAuthContext: jest.fn().mockImplementation(() => ({ authenticated: true })),
}));

jest.mock('@lizards-inc-fe/fetcher', () => ({
  useDeleteRequest: jest.fn().mockImplementation(() => ({ trigger: () => new Promise(res => res(1)) })),
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

  it('triggers delete and refresh when delete button is clicked', async () => {
    const triggerRefresh = jest.fn();
    const { getByTestId } = render(<AnimalCard animal={animal} triggerRefresh={triggerRefresh} />);

    const deleteButton = getByTestId('animal-delete-button');
    expect(deleteButton).toBeTruthy();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(triggerRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it('displays the Female gender correctly', () => {
    const { getByText } = render(<AnimalCard animal={{ ...animal, gender: 'F' }} triggerRefresh={jest.fn()} />);
    expect(getByText('Female')).toBeTruthy();
  });

  it('displays the Male gender correctly', () => {
    const { getByText } = render(<AnimalCard animal={{ ...animal, gender: 'M' }} triggerRefresh={jest.fn()} />);
    expect(getByText('Male')).toBeTruthy();
  });

  it('displays the Other gender correctly', () => {
    const { getByText } = render(<AnimalCard animal={{ ...animal, gender: 'O' }} triggerRefresh={jest.fn()} />);
    expect(getByText('Other')).toBeTruthy();
  });

  it('displays the none gender correctly', () => {
    const { getByText } = render(<AnimalCard animal={{ ...animal, gender: '_' }} triggerRefresh={jest.fn()} />);
    expect(getByText('none')).toBeTruthy();
  });

  it('displays the animal name below 40 characters', () => {
    const { getByText } = render(
      <AnimalCard animal={{ ...animal, name: '123456789_123456789_123456789_123456789' }} triggerRefresh={jest.fn()} />
    );

    expect(getByText('123456789_123456789_123456789_123456789')).toBeTruthy();
  });

  it('concenates the name if the length is over and equal to 40', () => {
    const { getByText } = render(
      <AnimalCard
        animal={{ ...animal, name: '123456789_123456789_123456789_123456789_1' }}
        triggerRefresh={jest.fn()}
      />
    );

    expect(getByText('123456789_123456789_123456789_123456789_...')).toBeTruthy();
  });

  it("makes the background's opacity 41 if the opacity is not present", () => {
    const { baseElement } = render(<AnimalCard animal={{ ...animal, color: '#000000' }} triggerRefresh={jest.fn()} />);

    const card = baseElement.querySelector('.ant-card') as HTMLElement;
    expect(card).toBeTruthy();
    expect(card.style.backgroundColor).toBe('rgba(0, 0, 0, 0.255)'); // 0.255 % = 41 alpha
  });

  it("makes the background's opacity 41 if the opacity is present", () => {
    const { baseElement } = render(
      <AnimalCard animal={{ ...animal, color: '#00000010' }} triggerRefresh={jest.fn()} />
    );

    const card = baseElement.querySelector('.ant-card') as HTMLElement;
    expect(card).toBeTruthy();
    expect(card.style.backgroundColor).toBe('rgba(0, 0, 0, 0.255)'); // 0.255 % = 41 alpha
  });
});
