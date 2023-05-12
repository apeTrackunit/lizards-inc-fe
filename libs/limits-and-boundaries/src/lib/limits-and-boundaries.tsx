import React from 'react';
import {Divider, InputNumber} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';

/* eslint-disable-next-line */
export interface LimitsAndBoundariesProps {}

const style: React.CSSProperties = {
    marginLeft: 70,
    marginRight: 70,
    marginTop: 20
};

const marksTemp: SliderMarks = {
    0: {
        label: <strong>0°C</strong>,
    },
    50: {
        label: <strong>50°C</strong>,
    },
};

const marksHum: SliderMarks = {
    0: {
        label: <strong>0%</strong>,
    },
    100: {
        label: <strong>100%</strong>,
    },
};

const marksCO2: SliderMarks = {
    0: {
        label: <strong>0 ppm</strong>,
    },
    10000: {
        label: <strong> 10000 ppm</strong>,
    },
};

const info: MenuProps['items'] = [
    {
        label: (
            <p>
                Used for selecting the temperature at which the cooling and heating should start working.
            </p>
        ),
        key: '0',
    },
];

const info1: MenuProps['items'] = [
    {
        label: (
            <p>
                Used for selecting the temperature, humidity or levels of CO at which
                you want to receive notifications.
            </p>
        ),
        key: '1',
    }
];

export function LimitsAndBoundaries(props: LimitsAndBoundariesProps) {
  return (
    <div>
        <div className="flex flex-row-reverse">
            <button className="rounded-none bg-sky-500 hover:bg-cyan-600">
                <div className="px-5 py-1">
                    Save
                </div>
            </button>
        </div>
        <div>
            <div className="flex">
                <p className = "text-4xl">Limits</p>
                <div>
                    <Dropdown menu={ { items:info } }>
                        <Space>
                            <InfoCircleOutlined />
                        </Space>
                    </Dropdown>
                </div>
            </div>
            <Divider/>
            <div >
                <p className = "text-2xl text-zinc-500">Temperature</p>
                <div style={style}>
                    <Slider range marks={marksTemp} defaultValue={[0, 38]} max={50}/>
                </div>
            </div>
        </div>
        <div>
            <div className = "flex pt-7">
                <p className = "text-4xl">Boundaries</p>
                <div>
                    <Dropdown menu={{ items:info1 }}>
                        <Space>
                            <InfoCircleOutlined />
                        </Space>
                    </Dropdown>
                </div>
            </div>
            <Divider />
            <div className = "flex flex-row">
                <div className = "basis-1/3">
                    <p className = "text-2xl text-zinc-500">Temperature</p>
                    <div>
                        <div className = "w-5/6">
                            <Slider range marks={marksTemp} defaultValue={[0, 38]} max={50}/>
                        </div>
                    </div>
                </div>
                <div className = "basis-1/3">
                    <p className = "text-2xl text-zinc-500">Humidity</p>
                    <div>
                        <div className = "w-5/6">
                            <Slider range marks={marksHum} defaultValue={[0, 38]} max={100}/>
                        </div>
                    </div>
                </div>
                <div className = "basis-1/3">
                    <p className = "text-2xl text-zinc-500">C02</p>
                    <div>
                        <div className = "w-5/6">
                            <Slider range marks={marksCO2} defaultValue={[0, 38]} max={10000}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LimitsAndBoundaries;
