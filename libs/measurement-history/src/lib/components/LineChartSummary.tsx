import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PureComponent } from 'react';
import { Skeleton } from 'antd';
import { DisplayConfig } from '@lizards-inc-fe/model';

export interface LineChartSummaryData {
  date: string;
  temperature: number;
  humidity: number;
  co2: number;
}

/*const CustomizedAxisTick = ({ x = 0, y = 0, value }: { x?: number; y?: number; value?: string }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {value}
      </text>
    </g>
  );
};*/

// i don't know why, but it works with this one
class CustomizedAxisTick extends PureComponent {
  render() {
    // @ts-ignore
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value.substring(0, payload.value.indexOf(' '))}
        </text>
      </g>
    );
  }
}

export const LineChartSummary = ({ data }: { data?: LineChartSummaryData[] | undefined }) => {
  return data === undefined ? (
    <Skeleton.Avatar active={true} size={400} shape={'square'} className={'rounded-lg overflow-hidden'} />
  ) : (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dot={false}
          dataKey="temperature"
          name={'Temperature'}
          stroke={DisplayConfig.temperature.hexColor}
        />
        <Line
          type="monotone"
          dot={false}
          dataKey="humidity"
          name={'Humidity'}
          stroke={DisplayConfig.humidity.hexColor}
        />
        <Line type="monotone" dot={false} dataKey="co2" name={'CO2'} stroke={DisplayConfig.co2.hexColor} />
      </LineChart>
    </ResponsiveContainer>
  );
};
