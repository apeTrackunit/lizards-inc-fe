import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Divider, Skeleton } from 'antd';
import TemperatureIcon from './assets/temperature-icon.png';
import Co2Icon from './assets/co2-icon.png';
import HumidityIcon from './assets/humidity-icon.png';
import { MeasurementCard } from './components/MeasurementCard';
import moment from 'moment';
import { IMeasurement } from './IMeasurement';
import { IBoundary } from './IBoundary';
import { MeasurementContainer } from './components/MeasurementContainer';

const getLatestMeasurement = () => {
  const response = useGetRequest<IMeasurement>({ url: '/Measurements/latest' });

  return {
    latestMeasurement: response.data,
    isLatestMeasurementLoading: response.isLoading,
  };
};

const getBoundaries = () => {
  const response = useGetRequest<IBoundary>({ url: '/Terrarium/boundaries' });

  return {
    boundaries: response.data,
    isBoundariesLoading: response.isLoading,
  };
};

const getMeasurementsRange = () => {
  const response = useGetRequest<IMeasurement[]>({ url: '/Measurements/all' });

  return {
    measurementRange: response.data,
    isMeasurementRangeLoading: response.data,
  };
};

export const Home = () => {
  const { latestMeasurement, isLatestMeasurementLoading } = getLatestMeasurement();
  const { boundaries } = getBoundaries();
  const { measurementRange } = getMeasurementsRange();

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
              <span>Measured at {moment(latestMeasurement?.dateTime).format('hh:mm:ss DD.MM.YYYY')}</span>
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
                hexColor: '#e30000',
              }}
              userData={{
                boundaries:
                  boundaries == undefined
                    ? undefined
                    : { min: boundaries.temperatureBoundaryMin, max: boundaries.temperatureBoundaryMax },
                historyMeasurements:
                  measurementRange == undefined
                    ? undefined
                    : measurementRange.map(measurement => ({
                        name: moment(measurement.dateTime).format('yyyy.MM.DD'),
                        data: measurement.temperature,
                      })),
                measurementData: latestMeasurement?.temperature,
                measurementDisplayData: `${latestMeasurement?.temperature} °C`,
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
                hexColor: '#00f',
              }}
              userData={{
                boundaries:
                  boundaries == undefined
                    ? undefined
                    : { min: boundaries.humidityBoundaryMin, max: boundaries.humidityBoundaryMax },
                historyMeasurements:
                  measurementRange == undefined
                    ? undefined
                    : measurementRange.map(measurement => ({
                        name: moment(measurement.dateTime).format('yyyy.MM.DD'),
                        data: measurement.humidity,
                      })),
                measurementData: latestMeasurement?.humidity,
                measurementDisplayData: `${latestMeasurement?.humidity} %`,
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
                hexColor: '#00b700',
              }}
              userData={{
                boundaries:
                  boundaries == undefined
                    ? undefined
                    : { min: boundaries.cO2BoundaryMin, max: boundaries.cO2BoundaryMax },
                historyMeasurements:
                  measurementRange == undefined
                    ? undefined
                    : measurementRange.map(measurement => ({
                        name: moment(measurement.dateTime).format('yyyy.MM.DD'),
                        data: measurement.co2,
                      })),
                measurementData: latestMeasurement?.co2,
                measurementDisplayData: `${latestMeasurement?.co2} ppm`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
