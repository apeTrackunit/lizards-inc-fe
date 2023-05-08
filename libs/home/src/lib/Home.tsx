import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Card, Divider, Statistic } from 'antd';
import TemperatureIcon from './assets/temperature-icon.png';
import Co2Icon from './assets/co2-icon.png';
import HumidityIcon from './assets/humidity-icon.png';

interface IMeasurement {
  id: string;
  temperature: number;
  humidity: number;
  co2: number;
  date: string;
  time: string;
}

export function Home() {
  const { data, isLoading } = useGetRequest<IMeasurement>({ url: '/Measurements/latest' });

  return (
    <div>
      <h1 className={'text-2xl'}>Home</h1>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={'font-medium text-lg'}>Current status</h1>
        {isLoading && <div>Loading...</div>}

        {!isLoading && (
          <div className={'flex flex-col gap-4'}>
            <span className={'grid justify-items-end text-gray-500'}>
              Measured at {data?.time.substring(0, 8) + ' on ' + data?.date}
            </span>
            <div className="flex gap-4 justify-around sm:flex-row flex-col">
              <Card className={'bg-red-100 w-52 h-fit'}>
                <Statistic
                  title="Temperature"
                  value={`${data?.temperature} °C`}
                  prefix={<img src={TemperatureIcon} alt={'temperature-logo'} className={'h-8 mr-2'} />}
                  valueStyle={{ alignItems: 'center', display: 'flex' }}
                />
              </Card>
              <Card className={'bg-blue-100 w-52 h-fit'}>
                <Statistic
                  title="Humidity"
                  value={`${data?.humidity} %`}
                  prefix={<img src={HumidityIcon} alt={'humidity-logo'} className={'h-8 mr-2'} />}
                  valueStyle={{ alignItems: 'center', display: 'flex' }}
                />
              </Card>
              <Card className={'bg-green-100 w-52 h-fit'}>
                <Statistic
                  title="CO2"
                  value={`${data?.co2} %`}
                  prefix={<img src={Co2Icon} alt={'co2-logo'} className={'h-8 mr-2'} />}
                  valueStyle={{ alignItems: 'center', display: 'flex' }}
                />
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
