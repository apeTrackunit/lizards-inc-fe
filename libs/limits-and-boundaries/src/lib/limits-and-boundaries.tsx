import React from 'react';
import { Divider, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import Notification from './components/Notification';
import { useGetRequest } from '@lizards-inc-fe/fetcher';

interface IBoundaries {
  id: string;
  temperatureBoundaryMax: number;
  temperatureBoundaryMin: number;
  humidityBoundaryMax: number;
  humidityBoundaryMin: number;
  cO2BoundaryMax: number;
  cO2BoundaryMin: number;
}

interface ILimits {
  id: string;
  temperatureLimitMax: number;
  temperatureLimitMin: number;
}

const style: React.CSSProperties = {
  marginLeft: 70,
  marginRight: 70,
  marginTop: 20,
};

const marksTemp: SliderMarks = {
  0: {
    label: '0°C',
  },
  50: {
    label: '50°C',
  },
  100: {
    label: '100°C',
  },
};

const marksHum: SliderMarks = {
  0: {
    label: '0%',
  },
  100: {
    label: '100%',
  },
};

const marksCO2: SliderMarks = {
  0: {
    label: '0%',
  },
  100: {
    label: '100%',
  },
};

const Limits = ({ limitsData, limitsLoading }: { limitsData: ILimits | undefined; limitsLoading: boolean }) => (
  <div>
    <p className="text-2xl text-zinc-500">Temperature</p>
    <div style={style}>
      {!limitsLoading ? (
        <Slider
          range
          marks={marksTemp}
          defaultValue={limitsData ? [limitsData.temperatureLimitMin, limitsData.temperatureLimitMax] : [0, 50]}
          onAfterChange={value => null}
          max={100}
        />
      ) : (
        <span>Loading...</span>
      )}
    </div>
  </div>
);

const BoundariesSlider = ({
  title,
  marks,
  boundariesData,
  boundariesLoading,
}: {
  title: string;
  marks: SliderMarks;
  boundariesData: IBoundaries | undefined;
  boundariesLoading: boolean;
}) => (
  <div className="basis-1/3">
    <p className="text-2xl text-zinc-500">{title}</p>
    <div>
      <div className="w-5/6">
        {!boundariesLoading ? (
          <Slider
            range
            marks={marks}
            defaultValue={
              boundariesData ? [boundariesData.temperatureBoundaryMin, boundariesData.temperatureBoundaryMax] : [0, 50]
            }
            onAfterChange={value => null}
            max={100}
          />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  </div>
);

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
