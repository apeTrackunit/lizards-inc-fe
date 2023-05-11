import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Divider, Skeleton } from 'antd';
import TemperatureIcon from './assets/temperature-icon.png';
import Co2Icon from './assets/co2-icon.png';
import HumidityIcon from './assets/humidity-icon.png';
import { MeasurementCard } from './components/MeasurementCard';

interface IMeasurement {
  id: string;
  temperature: number;
  humidity: number;
  co2: number;
  date: string;
  time: string;
}

export const Home = () => {
  const { data, isLoading } = useGetRequest<IMeasurement>({ url: '/Measurements/latest' });

  return (
    <div>
      <h1 className={'text-2xl'}>Home</h1>
      <Divider />
      <div className={'flex flex-col'}>
        <h1 className={'font-medium text-lg'}>Current status</h1>
        <div className={'flex flex-col gap-4'}>
          <span className={'grid justify-items-end text-gray-500'}>
            {isLoading ? (
              <Skeleton active={true} paragraph={false} className={'max-w-md'} />
            ) : (
              <span>Measured at {data?.time.substring(0, 8) + ' on ' + data?.date}</span>
            )}
          </span>
          <div className="flex gap-4 lg:justify-around items-center lg:flex-row flex-col">
            <MeasurementCard
              isLoading={isLoading}
              title={'Temperature'}
              icon={TemperatureIcon}
              value={`${data?.temperature} °C`}
              cardClassName={'bg-red-100 w-full lg:w-60 h-fit'}
            />
            <MeasurementCard
              isLoading={isLoading}
              title={'Humidity'}
              icon={HumidityIcon}
              value={`${data?.humidity} %`}
              cardClassName={'bg-blue-100 w-full lg:w-60 h-fit'}
            />
            <MeasurementCard
              isLoading={isLoading}
              title={'CO2'}
              icon={Co2Icon}
              value={`${data?.co2} ppm`}
              cardClassName={'bg-green-100 w-full lg:w-60 h-fit'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
