import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Col, Divider, Row, Statistic } from 'antd';

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
        <h4>Cage status</h4>
        {isLoading && <div>Loading...</div>}

        {!isLoading && (
          <Col>
            <Row style={{ marginBottom: '10px' }}>
              <span style={{ paddingRight: '4px' }}>
                Measured at {data?.time.substring(0, 8) + ' on ' + data?.date}
              </span>
            </Row>
            <Row gutter={16}>
              <Col span={4}>
                <Statistic title="Temperature" value={`${data?.temperature} °C`} />
              </Col>
              <Col span={4}>
                <Statistic title="Humidity" value={`${data?.humidity} %`} />
              </Col>
              <Col span={4}>
                <Statistic title="CO2" value={`${data?.co2} %`} />
              </Col>
            </Row>
          </Col>
        )}
      </div>
    </div>
  );
}
