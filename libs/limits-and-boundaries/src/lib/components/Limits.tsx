import { Slider } from 'antd';
import React from 'react';
import { style, marksTemp } from './MarksAndStyle';
import { ILimits } from './Interfaces';

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

export { Limits };
