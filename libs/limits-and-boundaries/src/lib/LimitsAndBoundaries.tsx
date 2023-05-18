import React, { useEffect, useState } from 'react';
import { Divider, notification, Skeleton, Slider, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useGetRequest, usePutRequest } from '@lizards-inc-fe/fetcher';
import { Limits } from './components/Limits';
import { marksHum, marksTemp, marksCO2 } from './components/MarksAndStyle';
import { IBoundaries, ILimits } from './components/Interfaces';
import { SliderMarks } from 'antd/es/slider';
import { NotificationPlacement } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ITempData {
  tempMin: number;
  tempMax: number;
}

interface IHumData {
  humMin: number;
  humMax: number;
}

interface ICO2Data {
  co2Min: number;
  co2Max: number;
}

interface INotificationState {
  message: string;
  type: NotificationType;
}

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
  const handlePut = async () => {
    console.log('Trigger');
    try {
      const response = await trigger();
      console.log(response?.data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const openNotification = (placement: NotificationPlacement, type: NotificationType) => {
    api[type]({
      message: message?.message,
      placement,
    });
  };

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
      handlePut()
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
  }, [dataCO2, dataHum, dataTemp]);

  useEffect(() => {
    if (message) openNotification('bottomRight', message?.type);
  }, [message]);

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
        <div className="w-5/6">
          {boundariesData ? (
            <Slider range marks={marks} defaultValue={defaultValue} onAfterChange={onAfterChange} max={max} />
          ) : (
            <Skeleton>Loading...</Skeleton>
          )}
        </div>
      </div>
    </div>
  );
};
const LimitsAndBoundaries = () => {
  const {
    data: boundariesData,
    isLoading: boundariesLoading,
    mutate: mutateBoundaries,
  } = useGetRequest<IBoundaries>({
    url: 'Terrarium/boundaries',
  });
  const {
    data: limitsData,
    isLoading: limitsLoading,
    mutate: mutateLimits,
  } = useGetRequest<ILimits>({ url: 'Terrarium/limits' });

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
