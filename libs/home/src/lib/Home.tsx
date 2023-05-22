import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Divider, Skeleton } from 'antd';
import TemperatureIcon from './assets/temperature-icon.png';
import Co2Icon from './assets/co2-icon.png';
import HumidityIcon from './assets/humidity-icon.png';
import moment from 'moment';
import { MeasurementContainer } from './components/MeasurementContainer';
import {
  DisplayConfig,
  DisplayDateFormat,
  filterData,
  IBoundary,
  IMeasurement,
  roundValue,
} from '@lizards-inc-fe/model';
import dayjs from 'dayjs';

export const Home = () => {
  const { data: latestMeasurement, isLoading: isLatestMeasurementLoading } = useGetRequest<IMeasurement>({
    url: '/Measurements/latest',
  });
  const { data: boundaries } = useGetRequest<IBoundary>({ url: '/Terrarium/boundaries' });
  const { data: measurementRange } = useGetRequest<IMeasurement[]>({
    url: '/Measurements',
    params: {
      dateFrom: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      dateTo: dayjs().format('YYYY-MM-DD'),
    },
  });

  return (
    <div>
      <h1 className={'text-2xl'}>Home</h1>
      <Divider />
      <div className={'flex flex-col'}>
        <h1 className={'font-medium text-lg'}>Current status</h1>
        <div className={'flex flex-col gap-4'}>
          <span className={'grid justify-items-end text-gray-500'}>
            {isLatestMeasurementLoading ? (
              <Skeleton active={true} paragraph={false} className={'max-w-md'} />
            ) : (
              <span>Measured at {moment(latestMeasurement?.dateTime).format(DisplayDateFormat)}</span>
            )}
          </span>
          <div className="flex gap-4 xl:justify-around items-center xl:flex-row flex-col flex-wrap">
            <MeasurementContainer
              title={'Temperature'}
              cardConfig={{
                cardColor: 'bg-red-100',
                icon: TemperatureIcon,
              }}
              diagramConfig={{
                hexColor: DisplayConfig.temperature.hexColor,
              }}
              userData={{
                boundaries: boundaries
                  ? { min: boundaries.temperatureBoundaryMin, max: boundaries.temperatureBoundaryMax }
                  : undefined,
                historyMeasurements: filterData(measurementRange, 100)?.map(measurement => ({
                  name: moment(measurement.dateTime).format(DisplayDateFormat),
                  data: roundValue(measurement.temperature, 2),
                })),
                measurementData: latestMeasurement?.temperature,
                measurementDisplayData: DisplayConfig.temperature.format(latestMeasurement?.temperature ?? 0),
              }}
            />
            <Divider className={'xl:hidden'} />
            <MeasurementContainer
              title={'Humidity'}
              cardConfig={{
                cardColor: 'bg-blue-100',
                icon: HumidityIcon,
              }}
              diagramConfig={{
                hexColor: DisplayConfig.humidity.hexColor,
              }}
              userData={{
                boundaries: boundaries
                  ? { min: boundaries.humidityBoundaryMin, max: boundaries.humidityBoundaryMax }
                  : undefined,
                historyMeasurements: filterData(measurementRange, 100)?.map(measurement => ({
                  name: moment(measurement.dateTime).format(DisplayDateFormat),
                  data: roundValue(measurement.humidity, 2),
                })),
                measurementData: latestMeasurement?.humidity,
                measurementDisplayData: DisplayConfig.humidity.format(latestMeasurement?.humidity ?? 0),
              }}
            />
            <Divider className={'xl:hidden'} />
            <MeasurementContainer
              title={'CO2'}
              cardConfig={{
                cardColor: 'bg-green-100',
                icon: Co2Icon,
              }}
              diagramConfig={{
                hexColor: DisplayConfig.co2.hexColor,
              }}
              userData={{
                boundaries: boundaries ? { min: boundaries.cO2BoundaryMin, max: boundaries.cO2BoundaryMax } : undefined,
                historyMeasurements: filterData(measurementRange, 100)?.map(measurement => ({
                  name: moment(measurement.dateTime).format(DisplayDateFormat),
                  data: roundValue(measurement.co2, 2),
                })),
                measurementData: latestMeasurement?.co2,
                measurementDisplayData: DisplayConfig.co2.format(latestMeasurement?.co2 ?? 0),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
