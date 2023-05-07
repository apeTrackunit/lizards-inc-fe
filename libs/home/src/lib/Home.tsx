import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Card, Col, Divider, Row, Statistic } from 'antd';
import colors from 'tailwindcss/colors';

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
      <h1>Home</h1>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>Cage status</h4>
        {isLoading && <div>Loading...</div>}

        {!isLoading && (
          <>
            <span style={{ paddingRight: '4px' }}>Measured at {data?.time.substring(0, 8) + ' on ' + data?.date}</span>
            <div className="flex gap-4 justify-around sm:flex-row flex-col">
              <Card className={'bg-red-300'}>
                <Statistic title="Temperature" value={`${data?.temperature} °C`} />
              </Card>
              <Card className={'bg-blue-300'}>
                <Statistic title="Humidity" value={`${data?.humidity} %`} />
              </Card>
              <Card className={'bg-green-300'}>
                <Statistic title="CO2" value={`${data?.co2} %`} />
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
