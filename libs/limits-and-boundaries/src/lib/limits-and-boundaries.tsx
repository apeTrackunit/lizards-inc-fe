import React, { useMemo } from 'react';
import { Button, Divider, Space, notification, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import Notification from './components/Notification';
import { NotificationPlacement } from 'antd/es/notification/interface';

/* eslint-disable-next-line */
export interface LimitsAndBoundariesProps {}

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
    label: '0 ppm',
  },
  10000: {
    label: '10000 ppm',
  },
};

export function LimitsAndBoundaries(props: LimitsAndBoundariesProps) {
  return (
    <div>
      <div className="flex flex-row-reverse">
        <Notification />
      </div>
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
        <div>
          <p className="text-2xl text-zinc-500">Temperature</p>
          <div style={style}>
            <Slider range marks={marksTemp} defaultValue={[0, 38]} max={50} />
          </div>
        </div>
      </div>
      <div>
        <div className="flex pt-7">
          <p className="text-4xl">Boundaries</p>
          <div className="pl-2">
            <Tooltip
              title={
                <div className="text-black">
                  Used for selecting the temperature, humidity or levels of CO at which you want to receive
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
          <div className="basis-1/3">
            <p className="text-2xl text-zinc-500">Temperature</p>
            <div>
              <div className="w-5/6">
                <Slider range marks={marksTemp} defaultValue={[0, 38]} max={50} />
              </div>
            </div>
          </div>
          <div className="basis-1/3">
            <p className="text-2xl text-zinc-500">Humidity</p>
            <div>
              <div className="w-5/6">
                <Slider range marks={marksHum} defaultValue={[0, 38]} max={100} />
              </div>
            </div>
          </div>
          <div className="basis-1/3">
            <p className="text-2xl text-zinc-500">C02</p>
            <div>
              <div className="w-5/6">
                <Slider range marks={marksCO2} defaultValue={[0, 38]} max={10000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LimitsAndBoundaries;
