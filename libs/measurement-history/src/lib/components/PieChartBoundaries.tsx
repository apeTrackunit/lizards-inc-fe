import { Pie, Cell, ResponsiveContainer, PieChart, Legend } from 'recharts';
import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';

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
  title: string;
}

export const PieChartBoundaries = ({ data, title }: IPieChartBoundariesProps) => {
  const [pieChartColors, setPieChartColors] = useState<string[]>([]);

  useEffect(() => {
    if (data !== undefined) setPieChartColors(data.map(d => d.color));
  }, [data]);

  return (
    <div className={'xl:h-60 h-52'}>
      <div className={'text-lg hidden xl:inline'}>{title}</div>
      {data === undefined ? (
        <>
          <br />
          <br />
          <Skeleton.Avatar active={true} size={170}></Skeleton.Avatar>
        </>
      ) : (
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={70}
            fill="#8884d8"
            dataKey="data"
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
            ))}
          </Pie>
          <Legend align={'left'} />
        </PieChart>
      )}
    </div>
  );
};
