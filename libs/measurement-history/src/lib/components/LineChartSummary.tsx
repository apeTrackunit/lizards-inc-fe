import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import React, { PureComponent, useMemo } from 'react';
import { Skeleton } from 'antd';
import { DisplayConfig } from '@lizards-inc-fe/model';

export interface LineChartSummaryData {
  date: string;
  temperature: number;
  humidity: number;
  co2: number;
}

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

interface LineChartSummaryProps {
  data?: LineChartSummaryData[] | undefined;
  isResponsive?: boolean;
  isLoading: boolean;
}

export const LineChartSummary = ({ data, isResponsive = true, isLoading }: LineChartSummaryProps) => {
  const chart = useMemo(
    () =>
      data && data.length !== 0 ? (
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
            format={'h'}
          />
          <Line type="monotone" dot={false} dataKey="co2" name={'CO2'} stroke={DisplayConfig.co2.hexColor} />
        </LineChart>
      ) : (
        <div className={'flex justify-center items-center h-full'}>No data</div>
      ),
    [data, DisplayConfig]
  );

  return !isLoading ? (
    isResponsive ? (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        {chart}
      </ResponsiveContainer>
    ) : (
      chart
    )
  ) : (
    <Skeleton.Avatar active={true} size={400} shape={'square'} className={'rounded-lg overflow-hidden'} />
  );
};
