import { SliderMarks } from 'antd/es/slider';
import { Slider } from 'antd';
import React from 'react';
import { IBoundaries } from './Interfaces';

const BoundariesSlider = ({
  title,
  marks,
  boundariesData,
  boundariesLoading,
  max,
}: {
  title: string;
  marks: SliderMarks;
  boundariesData: IBoundaries | undefined;
  boundariesLoading: boolean;
  max: number;
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
            onAfterChange={() => {
              console.log('re');
            }}
            max={max}
          />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  </div>
);

export { BoundariesSlider };
