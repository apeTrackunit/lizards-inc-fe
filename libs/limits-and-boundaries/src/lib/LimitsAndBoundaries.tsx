import React from 'react';
import { Divider, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { Limits } from './components/Limits';
import { marksHum, marksTemp, marksCO2 } from './components/MarksAndStyle';
import { IBoundaries, ILimits } from './components/Interfaces';
import { BoundariesSlider } from './components/BoundariesSlider';

const LimitsAndBoundaries = () => {
  const { data: boundariesData } = useGetRequest<IBoundaries>({
    url: 'Terrarium/boundaries',
  });
  const { data: limitsData, isLoading: limitsLoading } = useGetRequest<ILimits>({ url: 'Terrarium/limits' });

  return (
    <div>
      <div>
        <div className="flex">
          <p className="text-4xl">Limits</p>
          <div className="pl-2">
            <Tooltip
              title={
                <div className="text-black">
                  Used for selecting the temperature at which the cooling and heating should start working.
                </div>
              }
              placement="right"
              color="white"
            >
              <InfoCircleOutlined rev={undefined} />
            </Tooltip>
          </div>
        </div>
        <Divider />
        <Limits limitsData={limitsData} limitsLoading={limitsLoading} />
      </div>
      <div>
        <div className="flex pt-7">
          <p className="text-4xl">Boundaries</p>
          <div className="pl-2">
            <Tooltip
              title={
                <div className="text-black">
                  Used for selecting the temperature, humidity, or levels of CO at which you want to receive
                  notifications.
                </div>
              }
              placement="right"
              color="white"
            >
              <InfoCircleOutlined rev={undefined} />
            </Tooltip>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col md:ml-4 lg:flex-col lg:mt-4">
          <BoundariesSlider
            title="Temperature"
            marks={marksTemp}
            boundariesData={boundariesData}
            max={150}
            type="temperature"
          />
          <BoundariesSlider
            title="Humidity"
            marks={marksHum}
            boundariesData={boundariesData}
            max={100}
            type="humidity"
          />
          <BoundariesSlider title="CO2" marks={marksCO2} boundariesData={boundariesData} max={100} type="co2" />
        </div>
      </div>
    </div>
  );
};

export { LimitsAndBoundaries };
