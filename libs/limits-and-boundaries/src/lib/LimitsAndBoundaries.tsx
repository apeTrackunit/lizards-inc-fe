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
    <>
      <h1 className={'text-2xl font-bold'}>Settings</h1>
      <Divider />

      <div className={'flex flex-col gap-12'}>
        <div className={'flex flex-col gap-6'}>
          <div className="flex flex-row">
            <p className="text-xl">Limits</p>
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

          <div className={'px-6'}>
            <Limits limitsData={limitsData} limitsLoading={limitsLoading} />
          </div>
        </div>

        <div className={'flex flex-col gap-6'}>
          <div className="flex flex-row">
            <p className="text-xl">Boundaries</p>
            <div className="pl-2">
              <Tooltip
                title={
                  <div className="text-black">
                    Used for selecting the temperature, humidity, or levels of CO2 at which you want to receive.
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

          <div className="flex flex-col px-6 gap-4">
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
            <BoundariesSlider title="CO2" marks={marksCO2} boundariesData={boundariesData} max={10000} type="co2" />
          </div>
        </div>
      </div>
    </>
  );
};

export { LimitsAndBoundaries };
