import { SliderMarks } from 'antd/es/slider';
import { notification, Skeleton, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { IBoundaries, ICO2Data, IHumData, INotificationState, ITempData } from './Interfaces';
import { usePutRequest } from '@lizards-inc-fe/fetcher';

const BoundariesSlider = ({
  title,
  marks,
  boundariesData,
  type,
  max,
}: {
  title: string;
  marks: SliderMarks;
  boundariesData: IBoundaries | undefined;
  type: 'temperature' | 'humidity' | 'co2';
  max: number;
}) => {
  const [dataTemp, setTempData] = useState<ITempData | null>();
  const [dataHum, setHumData] = useState<IHumData | null>();
  const [dataCO2, setCO2Data] = useState<ICO2Data | null>();
  //const [data, setData] = useState<IBoundaries | null>();
  const data = boundariesData;
  const [api, contextHolder] = notification.useNotification();
  const { trigger } = usePutRequest<unknown, IBoundaries>({
    url: '/Terrarium/boundaries',
    data: data,
  });
  const [message, setMessage] = useState<INotificationState>();

  const extractValues = (value: number | [number, number]): [number, number] => {
    if (typeof value === 'number') {
      return [value, value];
    } else {
      return value;
    }
  };

  const onAfterChange = (value: number | [number, number]) => {
    const [min, max] = extractValues(value);
    if (data) {
      if (type === 'temperature') {
        setTempData({
          tempMin: min,
          tempMax: max,
        });
        data.temperatureBoundaryMin = min;
        data.temperatureBoundaryMax = max;
      } else if (type === 'humidity') {
        setHumData({
          humMin: min,
          humMax: max,
        });
        data.humidityBoundaryMin = min;
        data.humidityBoundaryMax = max;
      } else {
        setCO2Data({
          co2Min: min,
          co2Max: max,
        });
        data.cO2BoundaryMin = min;
        data.cO2BoundaryMax = max;
      }
    }
  };

  useEffect(() => {
    if (dataTemp || dataHum || dataCO2) {
      trigger()
        .then(response => {
          if (response) {
            setMessage({ message: 'Changes successfully saved!', type: 'success' });
          } else {
            setMessage({ message: 'Something went wrong!', type: 'error' });
          }
        })
        .catch(error => {
          console.error(error);
          setMessage({ message: 'Something went very wrong!', type: 'error' });
        });
    }
  }, [trigger, dataCO2, dataHum, dataTemp]);

  useEffect(() => {
    if (message) {
      api[message?.type]({
        message: message?.message,
        placement: 'bottomRight',
      });
    }
  }, [api, message]);

  let defaultValue: [number, number] = [0, 50];

  if (type === 'temperature') {
    defaultValue = [boundariesData?.temperatureBoundaryMin ?? 0, boundariesData?.temperatureBoundaryMax ?? 50];
  } else if (type === 'humidity') {
    defaultValue = [boundariesData?.humidityBoundaryMin ?? 0, boundariesData?.humidityBoundaryMax ?? 50];
  } else if (type === 'co2') {
    defaultValue = [boundariesData?.cO2BoundaryMin ?? 0, boundariesData?.cO2BoundaryMax ?? 50];
  }

  return (
    <div className="basis-1/3">
      <p className="text-2xl text-zinc-500">{title}</p>
      {contextHolder}
      <div>
        <div className="w-5/6 pb-10">
          {boundariesData ? (
            <Slider range marks={marks} defaultValue={defaultValue} onAfterChange={onAfterChange} max={max} />
          ) : (
            <Skeleton active paragraph={false}>
              Loading...
            </Skeleton>
          )}
        </div>
      </div>
    </div>
  );
};

export { BoundariesSlider };
