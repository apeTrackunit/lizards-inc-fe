import { FilterFilled } from '@ant-design/icons';
import { DatePicker, Divider } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CardElement } from '@lizards-inc-fe/shared-components';
import { HistoryTable } from './components/HistoryTable';
import { IPieChartBoundariesData } from './components/PieChartBoundaries';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { DisplayDateFormat, filterData, IBoundary, IMeasurement, roundValue } from '@lizards-inc-fe/model';
import { PieChartDiagramsCard } from './components/PieChartDiagramsCard';
import { LineChartSummary, LineChartSummaryData } from './components/LineChartSummary';

interface TimeSpanState {
  from: Dayjs | null;
  to: Dayjs | null;
}

export const MeasurementHistory = () => {
  const [dateStatus, setDateStatus] = useState<TimeSpanState>({
    from: dayjs().subtract(7, 'day'),
    to: dayjs(),
  });
  const {
    data: boundaries,
    isLoading: isBoundariesLoading,
    isValidating: isBoundariesValidating,
  } = useGetRequest<IBoundary>({ url: '/Terrarium/boundaries' });
  const {
    data: measurementRange,
    mutate: measurementRangeTrigger,
    isLoading: isMeasurementRangeLoading,
    isValidating: isMeasurementRangeValidating,
  } = useGetRequest<IMeasurement[]>({
    url: '/Measurements',
    params: {
      dateFrom: dateStatus.from?.format('YYYY-MM-DD HH:mm:ss').replace(' ', 'T'),
      dateTo: dateStatus.to?.format('YYYY-MM-DD HH:mm:ss').replace(' ', 'T'),
    },
  });

  const calculatePieChartData = (values: number[], min: number, max: number): IPieChartBoundariesData[] => {
    const countInBoundary = values.filter(v => v < max && v > min).length;
    const countOverBoundary = values.filter(v => v >= max).length;
    const countUnderBoundary = values.filter(v => v <= min).length;

    return [
      {
        name: 'Between Boundaries',
        data: countInBoundary,
        color: '#16a34a',
      },
      {
        name: 'Over Boundaries',
        data: countOverBoundary,
        color: '#e11d48',
      },
      {
        name: 'Under Boundaries',
        data: countUnderBoundary,
        color: '#9a3412',
      },
    ];
  };

  useEffect(() => {
    if (dateStatus.from == null || dateStatus.to == null) return;

    measurementRangeTrigger();
  }, [dateStatus.from?.unix(), dateStatus.to?.unix()]);

  const pieChartData = useMemo(() => {
    return measurementRange && boundaries
      ? {
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
        }
      : undefined;
  }, [measurementRange, boundaries]);

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
          <PieChartDiagramsCard
            diagramData={pieChartData}
            isLoading={
              isMeasurementRangeLoading || isMeasurementRangeValidating || isBoundariesLoading || isBoundariesValidating
            }
          />
        </CardElement>

        <CardElement className={'flex max-xl:h-80 justify-center max-w-full'}>
          <div className={'w-64 sm:w-72 md:w-96 lg:w-[40rem] xl:w-[28rem] 2xl:w-[32rem] flex justify-center'}>
            <LineChartSummary
              data={filterData(measurementRange, 100)?.map<LineChartSummaryData>(d => ({
                date: dayjs(d.dateTime).format(DisplayDateFormat),
                temperature: roundValue(d.temperature, 2),
                humidity: roundValue(d.humidity, 2),
                co2: roundValue(d.co2, 2),
              }))}
              isLoading={isMeasurementRangeLoading || isMeasurementRangeValidating}
            />
          </div>
        </CardElement>

        <CardElement className={'flex justify-center'}>
          <div className={'w-64 sm:w-80 md:w-[30rem] lg:w-[40rem] xl:w-[28rem] 2xl:w-[40rem]'}>
            <HistoryTable
              data={measurementRange?.map((d, index) => ({
                key: index + '',
                dayjs: dayjs(d.dateTime),
                temperature: d.temperature,
                humidity: d.humidity,
                co2: d.co2,
              }))}
              isLoading={isMeasurementRangeLoading || isMeasurementRangeValidating}
            />
          </div>
        </CardElement>
      </div>
    </>
  );
};

export default MeasurementHistory;
