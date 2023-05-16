import { render, screen } from '@testing-library/react';
import { Limits } from './Limits';

describe('Limits component', () => {
  it('renders temperature slider with default values when loading', () => {
    const limitsData = undefined;
    const limitsLoading = true;

    const { baseElement } = render(<Limits limitsData={limitsData} limitsLoading={limitsLoading} />);
    const sliderElement = baseElement.querySelector('.ant-slider-handle-1');

    expect(sliderElement).toBeDefined();
    expect(screen.queryByText('Loading...')).toBeTruthy();
  });

  it('renders temperature slider with provided values when not loading', () => {
    // Arrange
    const limitsData = {
      id: '1',
      temperatureLimitMin: 10,
      temperatureLimitMax: 90,
    };
    const limitsLoading = false;

    // Act
    const { baseElement } = render(<Limits limitsData={limitsData} limitsLoading={limitsLoading} />);
    // Assert
    const sliderElement = baseElement.getElementsByClassName('ant-slider-handle') as HTMLCollectionOf<HTMLElement>;

    expect(sliderElement).toBeDefined();
    expect(sliderElement[0].style.left).toBe('10%');
    expect(sliderElement[1].style.left).toBe('90%');
    expect(screen.queryByText('Loading...')).toBeNull();
  });
});
