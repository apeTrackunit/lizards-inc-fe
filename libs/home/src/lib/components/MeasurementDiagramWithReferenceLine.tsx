import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ReferenceDot } from 'recharts';
import { Skeleton } from 'antd';

export interface DiagramLine {
  y: number | undefined;
  color: string;
  label: string;
}

export interface DiagramData {
  name: string;
  data: number;
}

interface MeasurementDiagramWithReferenceLineProps {
  isLoading: boolean;
  height: number;
  width: number;
  lines: DiagramLine[];
  data: DiagramData[] | undefined;
  dataColor: string;
  dataName: string;
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

export const MeasurementDiagramWithReferenceLine = ({
  isLoading,
  height,
  width,
  lines,
  data,
  dataColor,
  dataName,
}: MeasurementDiagramWithReferenceLineProps) => {
  return isLoading ? (
    <Skeleton.Avatar active={true} size={Math.min(width, height)} shape={'square'} className={'translate-x-4'} />
  ) : data && data.length > 0 ? (
    <LineChart width={width} height={height} data={data} className={'-translate-x-4'}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend align={'right'} />
      {lines.map(line => (
        <ReferenceLine y={line.y} label={line.label} stroke={line.color} />
      ))}
      <Line type="monotone" dataKey="data" dot={false} stroke={dataColor} name={dataName} />
      <ReferenceDot r={1} fill="blue" stroke="none" />
    </LineChart>
  ) : (
    <div className={'flex justify-center items-center h-full'}>No data</div>
  );
};
