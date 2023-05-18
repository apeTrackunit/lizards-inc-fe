import { Pie, Cell, ResponsiveContainer, PieChart, Legend } from 'recharts';
import React, { useEffect, useState } from 'react';

const data = [
  { name: 'Group A', value: 400, color: '#f00' },
  { name: 'Group B', value: 300, color: '#0f0' },
  { name: 'Group C', value: 300, color: '#00f' },
];

const RADIAN = Math.PI / 180;

interface RenderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: RenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export interface IPieChartBoundariesData {
  name: string;
  data: number;
  color: string;
}

export interface IPieChartBoundariesProps {
  data?: IPieChartBoundariesData[] | undefined;
}

export const PieChartBoundaries = ({ data }: IPieChartBoundariesProps) => {
  const [pieChartColors, setPieChartColors] = useState<string[]>([]);

  useEffect(() => {
    if (data !== undefined) setPieChartColors(data.map(d => d.color));
  }, [data]);

  return (
    <div className={'h-96'}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
            ))}
          </Pie>
          <Legend align={'right'} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
