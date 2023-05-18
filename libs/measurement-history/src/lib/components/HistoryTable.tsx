import { Table, TableProps } from 'antd';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/lib/table';
import { DisplayConfig, DisplayDateFormat, DisplayDayFormat } from '@lizards-inc-fe/model';

export interface DataType {
  key: React.Key;
  dayjs: Dayjs;
  temperature: number;
  humidity: number;
  co2: number;
}

interface HistoryTableProps {
  data: DataType[] | undefined;
}

export const HistoryTable = ({ data }: HistoryTableProps) => {
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

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
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.temperature - b.temperature,
      align: 'center',
      render: value => DisplayConfig.temperature.format(value),
    },
    {
      title: 'Humidity',
      dataIndex: 'humidity',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.humidity - b.humidity,
      align: 'center',
      render: value => DisplayConfig.humidity.format(value),
    },
    {
      title: 'CO2',
      dataIndex: 'co2',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.co2 - b.co2,
      align: 'center',
      render: value => DisplayConfig.co2.format(value),
    },
  ];

  return (
    <Table scroll={{ y: 250 }} columns={columns} dataSource={data} loading={data === undefined} onChange={onChange} />
  );
};
