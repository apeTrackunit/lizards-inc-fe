import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Col, Divider, Row, Statistic } from 'antd';

export function Home() {
  const { data } = useGetRequest<object>({ url: '/pokemon' });

  return (
    <div>
      <h1>Home</h1>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>Cage status</h4>

        <Row gutter={16}>
          <Col span={4}>
            <Statistic title="Temperature" value={'32 °C'} />
          </Col>
          <Col span={4}>
            <Statistic title="Humidity" value={'84 %'} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
