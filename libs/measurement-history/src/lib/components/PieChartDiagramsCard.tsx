import { IPieChartBoundariesData, PieChartBoundaries } from './PieChartBoundaries';
import { Divider, Tabs } from 'antd';
import React, { useMemo } from 'react';

export interface PieChartDataState {
  temperatureData: IPieChartBoundariesData[] | undefined;
  humidityData: IPieChartBoundariesData[] | undefined;
  co2Data: IPieChartBoundariesData[] | undefined;
}

interface PieChartDiagramsCardProps {
  diagramData: PieChartDataState | undefined;
  isLoading: boolean;
}

export const PieChartDiagramsCard = ({ diagramData, isLoading }: PieChartDiagramsCardProps) => {
  const temperatureDiagram = useMemo(
    () => <PieChartBoundaries isLoading={isLoading} data={diagramData?.temperatureData} title={'Temperature'} />,
    [isLoading, diagramData?.temperatureData]
  );
  const humidityDiagram = useMemo(
    () => <PieChartBoundaries isLoading={isLoading} data={diagramData?.humidityData} title={'Humidity'} />,
    [isLoading, diagramData?.humidityData]
  );
  const co2Diagram = useMemo(
    () => <PieChartBoundaries isLoading={isLoading} data={diagramData?.co2Data} title={'CO2'} />,
    [isLoading, diagramData?.co2Data]
  );

  return (
    <>
      <div className={'xl:hidden'}>
        <Tabs
          items={[
            {
              key: 'temperature',
              label: 'Temperature',
              children: temperatureDiagram,
              className: 'flex justify-center',
            },
            {
              key: 'humidity',
              label: 'Humidity',
              children: humidityDiagram,
              className: 'flex justify-center',
            },
            {
              key: 'co2',
              label: 'CO2',
              children: co2Diagram,
              className: 'flex justify-center',
            },
          ]}
          defaultActiveKey="1"
        />
      </div>
      <div className={'hidden xl:flex justify-evenly'}>
        {temperatureDiagram}
        <Divider type={'vertical'} className={'h-60'} />
        {humidityDiagram}
        <Divider type={'vertical'} className={'h-60'} />
        {co2Diagram}
      </div>
    </>
  );
};
