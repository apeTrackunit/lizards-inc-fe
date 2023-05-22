import { ColumnsType } from 'antd/lib/table';
import { DisplayConfig, DisplayDateFormat, DisplayDayFormat } from '@lizards-inc-fe/model';
import { Dayjs } from 'dayjs';
import React from 'react';

export interface DataType {
  key: React.Key;
  dayjs: Dayjs;
  temperature: number;
  humidity: number;
  co2: number;
}

interface useHistoricTableColumnsProps {
  data: DataType[] | undefined;
}

export const useHistoricTableColumns = ({ data }: useHistoricTableColumnsProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Date',
      dataIndex: 'dayjs',
      filters:
        data === undefined
          ? []
          : [...new Set(data.map(d => d.dayjs.format(DisplayDayFormat)))].map(d => ({ text: d, value: d })),
      onFilter: (value, record) => record.dayjs.format('DD-MM-YYYY') === value,
      sorter: (a, b) => a.dayjs.unix() - b.dayjs.unix(),
      render: (value: Dayjs) => value.format(DisplayDateFormat),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      sorter: (a, b) => a.temperature - b.temperature,
      align: 'center',
      render: value => DisplayConfig.temperature.format(value),
    },
    {
      title: 'Humidity',
      dataIndex: 'humidity',
      sorter: (a, b) => a.humidity - b.humidity,
      align: 'center',
      render: value => DisplayConfig.humidity.format(value),
    },
    {
      title: 'CO2',
      dataIndex: 'co2',
      sorter: (a, b) => a.co2 - b.co2,
      align: 'center',
      render: value => DisplayConfig.co2.format(value),
    },
  ];

  return { columns };
};
