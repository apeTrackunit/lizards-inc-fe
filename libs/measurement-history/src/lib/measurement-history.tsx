import { FilterFilled } from '@ant-design/icons';
import { Card, DatePicker, Divider, Table, TableProps, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/lib/table';

interface TimeSpanState {
  from: Dayjs | null;
  to: Dayjs | null;
}

const initialState: TimeSpanState = {
  from: dayjs().subtract(10, 'day'),
  to: dayjs(),
};

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
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Date',
    dataIndex: 'displayDate',
    filters: [...new Set(data.map(d => d.dayjs.format('DD-MM-YYYY')))].map(d => ({ text: d, value: d })),
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.dayjs.format('DD-MM-YYYY') === value,
    sorter: (a, b) => a.dayjs.unix() - b.dayjs.unix(),
    fixed: 'left',
    width: 150,
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
    width: 100,
  },
  {
    title: 'CO2',
    dataIndex: 'co2',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.co2 - b.co2,
    width: 100,
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

interface CardProps {
  children?: string | JSX.Element | JSX.Element[];
}

const CardElement = (props: CardProps) => {
  return (
    <Card
      className={'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1 max-w-full overflow-x-auto'}
    >
      {props.children}
    </Card>
  );
};

export const MeasurementHistory = () => {
  const [dateStatus, setDateStatus] = useState(initialState);

  useEffect(() => {
    if (dateStatus.from == null || dateStatus.to == null) return;

    console.log('make a db request', dateStatus.from?.toISOString(), dateStatus.to?.toISOString());
  }, [dateStatus.from?.unix(), dateStatus.to?.unix()]);

  return (
    <>
      <h1 className={'text-2xl font-bold'}>History</h1>
      <br />
      <div className={'sticky top-0 w-full bg-inherit'}>
        <div className={'flex items-center gap-2'}>
          {/* Above className has the inner design */}
          <FilterFilled />
          <DatePicker.RangePicker
            size={'large'}
            use12Hours={false}
            mode={['date', 'date']}
            value={[dateStatus.from, dateStatus.to]}
            onCalendarChange={val => val != null && setDateStatus({ from: val[0], to: val[1] })}
          />
        </div>
        <Divider />
      </div>
      <div className={'w-full grid gap-2'}>
        <div className={'lg:col-span-2'}>
          <CardElement>
            <Tabs
              items={[
                {
                  key: 'temperature',
                  label: 'Temperature',
                  children: 'Hello',
                },
                {
                  key: 'humidity',
                  label: 'Humidity',
                  children: 'Wassup',
                },
                {
                  key: 'co2',
                  label: 'CO2',
                  children: 'Yeee',
                },
              ]}
              defaultActiveKey="1"
            />
          </CardElement>
        </div>
        <div>
          <CardElement></CardElement>
        </div>
        <div>
          <CardElement>
            <div className={'max-w-full'} style={{ maxWidth: '100% !important' }}>
              <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ x: '100px', y: '200px' }} />
              {/*loading={true}*/}
            </div>
          </CardElement>
        </div>
      </div>
    </>
  );
};

export default MeasurementHistory;
