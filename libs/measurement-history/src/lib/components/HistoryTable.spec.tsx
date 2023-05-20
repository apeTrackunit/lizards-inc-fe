import React from 'react';
import { render, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { HistoryTable, DataType } from './HistoryTable';
import { DisplayConfig, DisplayDateFormat } from '@lizards-inc-fe/model';

describe('HistoryTable', () => {
  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });
  });

  const sampleData: DataType[] = [
    {
      key: '1',
      dayjs: dayjs('2022-01-01'),
      temperature: 25,
      humidity: 50,
      co2: 500,
    },
    {
      key: '2',
      dayjs: dayjs('2022-01-02'),
      temperature: 26,
      humidity: 55,
      co2: 600,
    },
    {
      key: '3',
      dayjs: dayjs('2022-01-03'),
      temperature: 24,
      humidity: 48,
      co2: 550,
    },
  ];

  it('renders table with correct columns and data', async () => {
    const { getByText } = render(<HistoryTable data={sampleData} />);

    expect(getByText('Date')).toBeTruthy();
    expect(getByText('Temperature')).toBeTruthy();
    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('CO2')).toBeTruthy();

    await waitFor(() => {
      expect(getByText(dayjs('2022-01-01').format(DisplayDateFormat))).toBeTruthy();
      expect(getByText(dayjs('2022-01-02').format(DisplayDateFormat))).toBeTruthy();
      expect(getByText(dayjs('2022-01-03').format(DisplayDateFormat))).toBeTruthy();
    });
  });

  it('renders loading state when data is undefined', () => {
    const { container } = render(<HistoryTable data={undefined} />);
    const spinningAnimContainer = container.querySelector('.ant-spin');

    expect(spinningAnimContainer).toBeTruthy();
  });

  it('displays data correctly', () => {
    const { getByText } = render(<HistoryTable data={sampleData} />);

    expect(getByText(dayjs('2022-01-01').format(DisplayDateFormat))).toBeTruthy();
    expect(getByText(DisplayConfig.temperature.format(25))).toBeTruthy();
    expect(getByText(DisplayConfig.humidity.format(50))).toBeTruthy();
    expect(getByText(DisplayConfig.co2.format(500))).toBeTruthy();

    expect(getByText(dayjs('2022-01-02').format(DisplayDateFormat))).toBeTruthy();
    expect(getByText(DisplayConfig.temperature.format(26))).toBeTruthy();
    expect(getByText(DisplayConfig.humidity.format(55))).toBeTruthy();
    expect(getByText(DisplayConfig.co2.format(600))).toBeTruthy();

    expect(getByText(dayjs('2022-01-03').format(DisplayDateFormat))).toBeTruthy();
    expect(getByText(DisplayConfig.temperature.format(24))).toBeTruthy();
    expect(getByText(DisplayConfig.humidity.format(48))).toBeTruthy();
    expect(getByText(DisplayConfig.co2.format(550))).toBeTruthy();
  });
});
