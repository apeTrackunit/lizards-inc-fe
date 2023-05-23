import { render, screen } from '@testing-library/react';
import { BoundariesSlider } from './BoundariesSlider';
import { marksCO2, marksHum, marksTemp } from './MarksAndStyle';
import { AuthProvider } from '@lizards-inc-fe/auth';

jest.mock('react-router-dom');

describe('Boundaries component', () => {
  const boundariesData = {
    id: '1',
    temperatureBoundaryMax: 40,
    temperatureBoundaryMin: 10,
    humidityBoundaryMax: 30,
    humidityBoundaryMin: 20,
    cO2BoundaryMax: 48,
    cO2BoundaryMin: 14,
  };

  it('renders temperature slider with default values when loading', () => {
    const boundariesData = undefined;

    const { baseElement } = render(
      <AuthProvider>
        <BoundariesSlider
          boundariesData={boundariesData}
          marks={marksTemp}
          max={100}
          title={'Temperature'}
          type={'temperature'}
        />
      </AuthProvider>
    );
    const sliderElement = baseElement.querySelector('.ant-slider-handle-1');

    expect(sliderElement).toBeDefined();
  });

  it('renders temperature slider with provided values when loaded', () => {
    const { baseElement } = render(
      <AuthProvider>
        <BoundariesSlider
          boundariesData={boundariesData}
          marks={marksTemp}
          max={100}
          title={'Temperature'}
          type={'temperature'}
        />
      </AuthProvider>
    );
    const sliderElement = baseElement.getElementsByClassName('ant-slider-handle') as HTMLCollectionOf<HTMLElement>;

    expect(sliderElement).toBeDefined();
    expect(sliderElement[0].getAttribute('aria-valuenow')).toBe('10');
    expect(sliderElement[1].getAttribute('aria-valuenow')).toBe('40');
    expect(screen.queryByText('Loading...')).toBeNull();
  });

  it('renders humidity slider with default values when loading', () => {
    const boundariesData = undefined;

    const { baseElement } = render(
      <AuthProvider>
        <BoundariesSlider
          boundariesData={boundariesData}
          marks={marksHum}
          max={100}
          title={'Humidity'}
          type={'humidity'}
        />
      </AuthProvider>
    );
    const sliderElement = baseElement.querySelector('.ant-slider-handle-1');

    expect(sliderElement).toBeDefined();
  });

  it('renders humidity slider with provided values when loaded', () => {
    const { baseElement } = render(
      <AuthProvider>
        <BoundariesSlider
          boundariesData={boundariesData}
          marks={marksHum}
          max={100}
          title={'Humidity'}
          type={'humidity'}
        />
      </AuthProvider>
    );
    const sliderElement = baseElement.getElementsByClassName('ant-slider-handle') as HTMLCollectionOf<HTMLElement>;

    expect(sliderElement).toBeDefined();
    expect(sliderElement[0].getAttribute('aria-valuenow')).toBe('20');
    expect(sliderElement[1].getAttribute('aria-valuenow')).toBe('30');
    expect(screen.queryByText('Loading...')).toBeNull();
  });
  it('renders co2 slider with default values when loading', () => {
    const boundariesData = undefined;

    const { baseElement } = render(
      <AuthProvider>
        <BoundariesSlider boundariesData={boundariesData} marks={marksCO2} max={100} title={'CO2'} type={'co2'} />
      </AuthProvider>
    );
    const sliderElement = baseElement.querySelector('.ant-slider-handle-1');

    expect(sliderElement).toBeDefined();
  });

  it('renders co2 slider with provided values when loaded', () => {
    const { baseElement } = render(
      <AuthProvider>
        <BoundariesSlider boundariesData={boundariesData} marks={marksCO2} max={100} title={'CO2'} type={'co2'} />
      </AuthProvider>
    );
    const sliderElement = baseElement.getElementsByClassName('ant-slider-handle') as HTMLCollectionOf<HTMLElement>;

    expect(sliderElement).toBeDefined();
    expect(sliderElement[0].getAttribute('aria-valuenow')).toBe('14');
    expect(screen.queryByText('Loading...')).toBeNull();
  });
});
