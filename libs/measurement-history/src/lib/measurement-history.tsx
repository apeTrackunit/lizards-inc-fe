import { FilterFilled } from '@ant-design/icons';
import { DatePicker, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CardElement } from './components/CardElement';
import { HistoryTable } from './components/HistoryTable';
import { IPieChartBoundariesData } from './components/PieChartBoundaries';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { DisplayDateFormat, IBoundary, IMeasurement } from '@lizards-inc-fe/model';
import { PieChartDataState, PieChartDiagramsCard } from './components/PieChartDiagramsCard';
import { LineChartSummary, LineChartSummaryData } from './components/LineChartSummary';

interface TimeSpanState {
  from: Dayjs | null;
  to: Dayjs | null;
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
      <div className={'flex gap-4 lg:gap-8'}>
        <h1 className={'text-2xl font-bold'}>History</h1>
        <Divider type={'vertical'} className={'h-10 max-md:hidden'} />
        <div className={'w-full bg-inherit z-10'}>
          <div className={'flex items-center gap-2'}>
            <FilterFilled />
            <DatePicker.RangePicker
              size={'large'}
              use12Hours={false}
              mode={['date', 'date']}
              value={[dateStatus.from, dateStatus.to]}
              onCalendarChange={val => val != null && setDateStatus({ from: val[0], to: val[1] })}
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className={'grid gap-2 max-w-full'}>
        <CardElement className={'h-fit xl:col-span-2'}>
          <PieChartDiagramsCard diagramData={diagramData} />
        </CardElement>

        <CardElement className={'flex max-xl:h-80 justify-center max-w-full'}>
          <div className={'w-60 sm:w-72 md:w-96 lg:w-[40rem] xl:w-[28rem] 2xl:w-[32rem] flex justify-center'}>
            <LineChartSummary
              data={measurementRange?.map<LineChartSummaryData>(d => ({
                date: dayjs(d.dateTime).format(DisplayDateFormat),
                temperature: d.temperature,
                humidity: d.humidity,
                co2: d.co2,
              }))}
            />
          </div>
        </CardElement>

        <CardElement className={'flex justify-center'}>
          <div className={'w-60 sm:w-80 md:w-[30rem] lg:w-[40rem] xl:w-[28rem] 2xl:w-[40rem]'}>
            <HistoryTable
              data={measurementRange?.map((d, index) => ({
                key: index + '',
                dayjs: dayjs(d.dateTime),
                temperature: d.temperature,
                humidity: d.humidity,
                co2: d.co2,
              }))}
            />
          </div>
        </CardElement>
      </div>
    </>
  );
};

export default MeasurementHistory;
