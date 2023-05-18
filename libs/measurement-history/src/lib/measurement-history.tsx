import { FilterFilled } from '@ant-design/icons';
import { DatePicker, Divider, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CardElement } from './components/CardElement';
import { HistoryTable } from './components/HistoryTable';
import { IPieChartBoundariesData, PieChartBoundaries } from './components/PieChartBoundaries';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { IBoundary, IMeasurement } from '@lizards-inc-fe/model';

interface TimeSpanState {
  from: Dayjs | null;
  to: Dayjs | null;
}

interface PieChartDataState {
  temperatureData: IPieChartBoundariesData[] | undefined;
  humidityData: IPieChartBoundariesData[] | undefined;
  co2Data: IPieChartBoundariesData[] | undefined;
}

const calculatePieChartData = (values: number[], min: number, max: number): IPieChartBoundariesData[] => {
  const countInBoundary = values.filter(v => v < max && v > min).length;
  const countOverBoundary = values.filter(v => v >= max).length;
  const countUnderBoundary = values.filter(v => v <= min).length;

  return [
    {
      name: 'Good',
      data: countInBoundary,
      color: '#9afc9b',
    },
    {
      name: 'Over',
      data: countOverBoundary,
      color: '#ff6c6c',
    },
    {
      name: 'Under',
      data: countUnderBoundary,
      color: '#860000',
    },
  ];
};

export const MeasurementHistory = () => {
  const [dateStatus, setDateStatus] = useState<TimeSpanState>({
    from: dayjs().subtract(10, 'day'),
    to: dayjs(),
  });
  const { data: boundaries } = useGetRequest<IBoundary>({ url: '/Terrarium/boundaries' });
  const { data: measurementRange } = useGetRequest<IMeasurement[]>({ url: '/Measurements' });
  const [diagramData, setDiagramData] = useState<PieChartDataState>();

  useEffect(() => {
    if (dateStatus.from == null || dateStatus.to == null) return;

    console.log('make a db request', dateStatus.from?.toISOString(), dateStatus.to?.toISOString());
  }, [dateStatus.from?.unix(), dateStatus.to?.unix()]);

  useEffect(() => {
    if (boundaries === undefined || measurementRange === undefined) {
      setDiagramData(undefined);
      return;
    }

    setDiagramData({
      temperatureData: calculatePieChartData(
        measurementRange.map(m => m.temperature),
        boundaries.temperatureBoundaryMin,
        boundaries.temperatureBoundaryMax
      ),
      humidityData: calculatePieChartData(
        measurementRange.map(m => m.humidity),
        boundaries.humidityBoundaryMin,
        boundaries.humidityBoundaryMax
      ),
      co2Data: calculatePieChartData(
        measurementRange.map(m => m.co2),
        boundaries.cO2BoundaryMin,
        boundaries.cO2BoundaryMax
      ),
    });
  }, [boundaries, measurementRange]);

  return (
    <>
      <h1 className={'text-2xl font-bold'}>History</h1>
      <br />
      <div className={'sticky top-0 w-full bg-inherit z-10'}>
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
      <div className={'grid gap-2'}>
        <div className={'lg:col-span-2'}>
          <CardElement>
            <Tabs
              items={[
                {
                  key: 'temperature',
                  label: 'Temperature',
                  children: <PieChartBoundaries data={diagramData?.temperatureData}></PieChartBoundaries>,
                },
                {
                  key: 'humidity',
                  label: 'Humidity',
                  children: <PieChartBoundaries data={diagramData?.humidityData}></PieChartBoundaries>,
                },
                {
                  key: 'co2',
                  label: 'CO2',
                  children: <PieChartBoundaries data={diagramData?.co2Data}></PieChartBoundaries>,
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
