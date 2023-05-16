import React from 'react';
import { Divider, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Notification from './components/Notification';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { BoundariesSlider } from './components/BoundariesSlider';
import { Limits } from './components/Limits';
import { marksHum, marksTemp, marksCO2 } from './components/MarksAndStyle';
import { IBoundaries, ILimits } from './components/Interfaces';

const LimitsAndBoundaries = () => {
  const { data: boundariesData, isLoading: boundariesLoading } = useGetRequest<IBoundaries>({
    url: 'Terrarium/boundaries',
  });
  const { data: limitsData, isLoading: limitsLoading } = useGetRequest<ILimits>({ url: 'Terrarium/limits' });

  return (
    <div>
      <Notification />
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
              <InfoCircleOutlined />
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
              <InfoCircleOutlined />
            </Tooltip>
          </div>
        </div>
        <Divider />
        <div className="flex flex-row">
          <BoundariesSlider
            title="Temperature"
            marks={marksTemp}
            boundariesData={boundariesData}
            boundariesLoading={boundariesLoading}
          />
          <BoundariesSlider
            title="Humidity"
            marks={marksHum}
            boundariesData={boundariesData}
            boundariesLoading={boundariesLoading}
          />
          <BoundariesSlider
            title="CO2"
            marks={marksCO2}
            boundariesData={boundariesData}
            boundariesLoading={boundariesLoading}
          />
        </div>
      </div>
    </div>
  );
};

export { LimitsAndBoundaries };
