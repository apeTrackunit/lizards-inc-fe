import { FilterFilled } from '@ant-design/icons';
import { Card, DatePicker, Divider, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

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
          <Card className={'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1'}>
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
          </Card>
        </div>
        <div>
          <Card className={'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1'}></Card>
        </div>
        <div>
          <Card className={'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1'}></Card>
        </div>
      </div>
    </>
  );
};

export default MeasurementHistory;
