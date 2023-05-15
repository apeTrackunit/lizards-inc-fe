import { render } from '@testing-library/react';
import { MeasurementCard } from './MeasurementCard';

const TemperatureIcon =
  'data:image/png;base64,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';

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
        icon={TemperatureIcon}
        value={`15 °C`}
        cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display the title', () => {
    const { baseElement } = render(
      <MeasurementCard
        isLoading={false}
        title={'Temperature'}
        icon={TemperatureIcon}
        value={`15 °C`}
        cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
      />
    );

    const titleElement = baseElement.querySelector('.ant-statistic-title');

    expect(titleElement).toBeTruthy();

    if (titleElement == null) return; // so we ignore a null warning
    expect(titleElement.textContent).toBe('Temperature');
  });

  it('should display the correct value', () => {
    const { baseElement } = render(
      <MeasurementCard
        isLoading={false}
        title={'Temperature'}
        icon={TemperatureIcon}
        value={`15 °C`}
        cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
      />
    );

    const valueElement = baseElement.querySelector('.ant-statistic-content-value');

    expect(valueElement).toBeTruthy();

    if (valueElement == null) return; // so we ignore a null warning
    expect(valueElement.textContent).toBe('15 °C');
  });

  it('should set the image', () => {
    const { baseElement } = render(
      <MeasurementCard
        isLoading={false}
        title={'Temperature'}
        icon={TemperatureIcon}
        value={`15 °C`}
        cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
      />
    );

    const imgElement = baseElement.querySelector('img');

    expect(imgElement).toBeTruthy();

    if (imgElement == null) return; // so we ignore a null warning
    expect(imgElement.src).toBe(TemperatureIcon);
  });

  it('should have class names', () => {
    const { baseElement } = render(
      <MeasurementCard
        isLoading={false}
        title={'Temperature'}
        icon={TemperatureIcon}
        value={`15 °C`}
        cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
      />
    );

    const cardElement = baseElement.querySelector('.ant-card');

    expect(cardElement).toBeTruthy();

    if (cardElement == null) return; // so we ignore a null warning
    expect(cardElement.classList).toContain('bg-red-100');
    expect(cardElement.classList).toContain('w-full');
    expect(cardElement.classList).toContain('lg:w-60');
    expect(cardElement.classList).toContain('h-fit');
  });

  it('should have skeleton when loading', () => {
    const { baseElement } = render(
      <MeasurementCard
        isLoading={true}
        title={'Temperature'}
        icon={TemperatureIcon}
        value={`15 °C`}
        cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
      />
    );

    const titleElement = baseElement.querySelector('.skeleton-title');
    expect(titleElement).toBeTruthy();

    if (titleElement == null) return; // so we ignore a null warning
    expect(titleElement.textContent).toBe('Temperature');

    const imgElement = baseElement.querySelector('img');
    expect(imgElement).toBeTruthy();

    if (imgElement == null) return; // so we ignore a null warning
    expect(imgElement.src).toBe(TemperatureIcon);

    const skeleton = baseElement.querySelector('.ant-skeleton');
    expect(skeleton).toBeTruthy();
  });
});
