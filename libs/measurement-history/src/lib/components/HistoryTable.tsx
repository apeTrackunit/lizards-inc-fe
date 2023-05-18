import { Table, TableProps } from 'antd';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/lib/table';
import { ResponsiveContainer } from 'recharts';

interface DataType {
  key: React.Key;
  displayDate: string;
  dayjs: Dayjs;
  temperature: number;
  humidity: number;
  co2: number;
}

const data = [
  {
    key: '1',
    displayDate: '16.10.2022 10:10:10',
    dayjs: dayjs('16.10.2022 10:10:10', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 1,
    humidity: 2,
    co2: 3,
  },
  {
    key: '2',
    displayDate: '18.10.2022 20:20:20',
    dayjs: dayjs('18.10.2022 20:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '3',
    displayDate: '18.10.2022 21:20:20',
    dayjs: dayjs('18.10.2022 21:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '4',
    displayDate: '18.10.2022 22:20:20',
    dayjs: dayjs('18.10.2022 22:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '5',
    displayDate: '18.10.2022 23:20:20',
    dayjs: dayjs('18.10.2022 23:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '6',
    displayDate: '19.10.2022 10:20:20',
    dayjs: dayjs('19.10.2022 10:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '7',
    displayDate: '19.10.2022 11:20:20',
    dayjs: dayjs('19.10.2022 10:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '8',
    displayDate: '19.10.2022 12:20:20',
    dayjs: dayjs('19.10.2022 10:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '9',
    displayDate: '19.10.2022 13:20:20',
    dayjs: dayjs('19.10.2022 10:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '10',
    displayDate: '19.10.2022 14:20:20',
    dayjs: dayjs('19.10.2022 10:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '11',
    displayDate: '19.10.2022 15:20:20',
    dayjs: dayjs('19.10.2022 10:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
  {
    key: '12',
    displayDate: '19.10.2022 16:20:20',
    dayjs: dayjs('19.10.2022 10:20:20', 'DD.MM.YYYY HH:mm:ss'),
    temperature: 2,
    humidity: 4,
    co2: 6,
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Date',
    dataIndex: 'displayDate',
    filters: [...new Set(data.map(d => d.dayjs.format('DD-MM-YYYY')))].map(d => ({ text: d, value: d })),
    onFilter: (value, record) => record.dayjs.format('DD-MM-YYYY') === value,
    sorter: (a, b) => a.dayjs.unix() - b.dayjs.unix(),
    fixed: 'left',
    width: 100,
  },
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.temperature - b.temperature,
    width: 100,
  },
  {
    title: 'Humidity',
    dataIndex: 'humidity',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.humidity - b.humidity,
    width: 80,
  },
  {
    title: 'CO2',
    dataIndex: 'co2',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.co2 - b.co2,
    width: 70,
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

interface HistoryTableProps {
  data: DataType[] | undefined;
}

export const HistoryTable = ({}: HistoryTableProps) => {
  return <Table columns={columns} dataSource={data} loading={data === undefined} onChange={onChange} />;
};
