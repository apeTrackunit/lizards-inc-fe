import { render } from '@testing-library/react';
import { MeasurementCard } from './MeasurementCard';

describe('MeasurementCard', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <MeasurementCard
        isLoading={false}
        title={'Temperature'}
        icon={'temperature-icon.png'}
        value={`15 °C`}
        cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render value when isLoading is false', () => {
    const props = {
      isLoading: false,
      title: 'Temperature',
      icon: 'temperature-icon.png',
      value: '25°C',
      cardClassName: 'custom-card',
    };

    const { getByText, getByAltText } = render(<MeasurementCard {...props} />);

    expect(getByText('Temperature')).toBeTruthy();
    expect(getByText('25°C')).toBeTruthy();
    expect(getByAltText('Temperature-logo')).toBeTruthy();
  });

  it('should render loading state when isLoading is true', () => {
    const props = {
      isLoading: true,
      title: 'Temperature',
      icon: 'temperature-icon.png',
      value: '',
      cardClassName: 'custom-card',
    };

    const { getByText, getByAltText, baseElement } = render(<MeasurementCard {...props} />);

    expect(getByText('Temperature')).toBeTruthy();
    expect(getByAltText('Temperature-logo')).toBeTruthy();

    const skeleton = baseElement.querySelector('.ant-skeleton');
    expect(skeleton).toBeTruthy();
  });
});
