import React from 'react';
import { render } from '@testing-library/react';
import { LineChartSummary, LineChartSummaryData } from './LineChartSummary';
import ResizeObserver from 'resize-observer-polyfill';
import { DisplayConfig } from '@lizards-inc-fe/model';

describe('LineChartSummary', () => {
  beforeAll(() => {
    // for the recharts ResponsiveContainer
    window.ResizeObserver = ResizeObserver;

    DisplayConfig.temperature = {
      ...DisplayConfig.temperature,
      hexColor: '#ff0000',
    };
    DisplayConfig.humidity = {
      ...DisplayConfig.humidity,
      hexColor: '#0000ff',
    };
    DisplayConfig.co2 = {
      ...DisplayConfig.co2,
      hexColor: '#00ff00',
    };
  });

  const sampleData: LineChartSummaryData[] = [
    { date: '2022-01-01', temperature: 25, humidity: 50, co2: 500 },
    { date: '2022-01-02', temperature: 26, humidity: 55, co2: 600 },
    { date: '2022-01-03', temperature: 24, humidity: 48, co2: 550 },
  ];

  it('renders skeleton when data is undefined', () => {
    const { container } = render(<LineChartSummary isLoading={true} data={undefined} />);

    const skeleton = container.querySelector('.ant-skeleton');

    expect(skeleton).toBeTruthy();
  });

  it('renders line chart with correct data', async () => {
    const { getByText } = render(<LineChartSummary isLoading={false} data={sampleData} isResponsive={false} />);

    expect(getByText('Temperature')).toBeTruthy();
    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('CO2')).toBeTruthy();
  });

  it('renders line chart legends with correct colors', () => {
    const { getByText } = render(<LineChartSummary isLoading={false} data={sampleData} isResponsive={false} />);

    expect(getByText('Temperature')).toBeTruthy();
    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('CO2')).toBeTruthy();
  });

  it('renders lines with correct colors', () => {
    const { container } = render(<LineChartSummary isLoading={false} data={sampleData} isResponsive={false} />);

    const tempPath = container.querySelector('path[name=Temperature]');
    const humiPath = container.querySelector('path[name=Humidity]');
    const co2Path = container.querySelector('path[name=CO2]');

    expect(tempPath).toBeTruthy();
    expect((tempPath as HTMLElement).getAttribute('stroke')).toBe('#ff0000');

    expect(humiPath).toBeTruthy();
    expect((humiPath as HTMLElement).getAttribute('stroke')).toBe('#0000ff');

    expect(co2Path).toBeTruthy();
    expect((co2Path as HTMLElement).getAttribute('stroke')).toBe('#00ff00');
  });
});
