import { FilterFilled } from '@ant-design/icons';
import { DatePicker, Divider, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CardElement } from './components/CardElement';
import { HistoryTable } from './components/HistoryTable';
import { PieChartBoundaries } from './components/PieChartBoundaries';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { IBoundary, IMeasurement } from '@lizards-inc-fe/model';

interface TimeSpanState {
  from: Dayjs | null;
  to: Dayjs | null;
}

const initialState: TimeSpanState = {
  from: dayjs().subtract(10, 'day'),
  to: dayjs(),
};

export const MeasurementHistory = () => {
  const [dateStatus, setDateStatus] = useState(initialState);
  const { data: boundaries } = useGetRequest<IBoundary>({ url: '/Terrarium/boundaries' });
  const { data: measurementRange } = useGetRequest<IMeasurement[]>({ url: '/Measurements/all' });

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
                  children: <PieChartBoundaries></PieChartBoundaries>,
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
          <CardElement className={'h-96 max-w-full'}>
            <HistoryTable data={undefined} />
          </CardElement>
        </div>
      </div>
    </>
  );
};

export default MeasurementHistory;
