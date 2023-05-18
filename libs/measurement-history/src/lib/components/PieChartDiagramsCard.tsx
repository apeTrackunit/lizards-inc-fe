import { IPieChartBoundariesData, PieChartBoundaries } from './PieChartBoundaries';
import { Divider, Tabs } from 'antd';
import React from 'react';

export interface PieChartDataState {
  temperatureData: IPieChartBoundariesData[] | undefined;
  humidityData: IPieChartBoundariesData[] | undefined;
  co2Data: IPieChartBoundariesData[] | undefined;
}

export const PieChartDiagramsCard = ({ diagramData }: { diagramData: PieChartDataState | undefined }) => {
  const temperatureDiagram = <PieChartBoundaries data={diagramData?.temperatureData} title={'Temperature'} />;
  const humidityDiagram = <PieChartBoundaries data={diagramData?.humidityData} title={'Humidity'} />;
  const co2Diagram = <PieChartBoundaries data={diagramData?.co2Data} title={'CO2'} />;

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
