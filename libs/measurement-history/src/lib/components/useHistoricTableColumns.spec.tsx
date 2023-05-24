import React from 'react';
import { useHistoricTableColumns } from './useHistoricTableColumns';
import dayjs from 'dayjs';
import { DisplayConfig, DisplayDateFormat, DisplayDayFormat } from '@lizards-inc-fe/model';

describe('useHistoricTableColumns', () => {
  const currentDayjs = dayjs();

  it('returns the correct columns for the historic table', () => {
    const data = [
      {
        key: '1',
        dayjs: dayjs('2023-05-20'),
        temperature: 25,
        humidity: 60,
        co2: 400,
      },
      {
        key: '2',
        dayjs: dayjs('2023-05-21'),
        temperature: 28,
        humidity: 65,
        co2: 500,
      },
    ];

    const { columns } = useHistoricTableColumns({ data });

    expect(columns).toHaveLength(4);

    expect(columns[0]).toEqual(
      expect.objectContaining({
        title: 'Date',
        dataIndex: 'dayjs',
        sorter: expect.any(Function),
      })
    );

    // @ts-ignore
    expect(columns[0].render(currentDayjs)).toBe(currentDayjs.format(DisplayDateFormat));
    // @ts-ignore
    expect(columns[0].onFilter(data[0].dayjs.format(DisplayDayFormat), data[0])).toBe(true);
    // @ts-ignore
    expect(columns[0].onFilter(data[0].dayjs.add(1, 'day').format(DisplayDayFormat), data[0])).toBe(false);
    // @ts-ignore
    expect(columns[0].sorter(data[0], data[1])).not.toBeGreaterThan(0);
    // @ts-ignore
    expect(columns[0].sorter(data[1], data[0])).toBeGreaterThan(0);

    expect(columns[1]).toEqual(
      expect.objectContaining({
        title: 'Temperature',
        dataIndex: 'temperature',
      })
    );

    // @ts-ignore
    expect(columns[1].render(1)).toBe(DisplayConfig.temperature.format(1));
    // @ts-ignore
    expect(columns[1].sorter(data[0], data[1])).not.toBeGreaterThan(0);
    // @ts-ignore
    expect(columns[1].sorter(data[1], data[0])).toBeGreaterThan(0);

    expect(columns[2]).toEqual(
      expect.objectContaining({
        title: 'Humidity',
        dataIndex: 'humidity',
      })
    );

    // @ts-ignore
    expect(columns[2].render(1)).toBe(DisplayConfig.humidity.format(1));
    // @ts-ignore
    expect(columns[2].sorter(data[0], data[1])).not.toBeGreaterThan(0);
    // @ts-ignore
    expect(columns[2].sorter(data[1], data[0])).toBeGreaterThan(0);

    expect(columns[3]).toEqual(
      expect.objectContaining({
        title: 'CO2',
        dataIndex: 'co2',
      })
    );

    // @ts-ignore
    expect(columns[3].render(1)).toBe(DisplayConfig.co2.format(1));
    // @ts-ignore
    expect(columns[3].sorter(data[0], data[1])).not.toBeGreaterThan(0);
    // @ts-ignore
    expect(columns[3].sorter(data[1], data[0])).toBeGreaterThan(0);
  });
});
