import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
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
  ) : (
    <LineChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend align={'right'} />
      {lines.map(line => (
        <ReferenceLine y={line.y} label={line.label} stroke={line.color} />
      ))}
      <Line type="monotone" dataKey="data" stroke={dataColor} name={dataName} />
    </LineChart>
  );
};
