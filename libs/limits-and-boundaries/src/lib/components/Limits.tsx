import { notification, Skeleton, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { style, marksTemp } from './MarksAndStyle';
import { ILimits } from './Interfaces';
import { ExtractValues } from './ExtractValues';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { usePutRequest } from '@lizards-inc-fe/fetcher';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface INotificationState {
  message: string;
  type: NotificationType;
}

const Limits = ({ limitsData, limitsLoading }: { limitsData: ILimits | undefined; limitsLoading: boolean }) => {
  const [api, contextHolder] = notification.useNotification();
  const { trigger } = usePutRequest<unknown, ILimits>({
    url: '/Terrarium/limits',
    data: limitsData,
  });
  const [message, setMessage] = useState<INotificationState>();
  const [limits, setLimits] = useState<ILimits | undefined>();

  const handlePut = async () => {
    console.log('TriggerLimits');
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

  const onAfterChange = (value: number | [number, number]) => {
    const [min, max] = ExtractValues(value);
    if (limitsData) {
      setLimits({
        id: limitsData.id,
        temperatureLimitMin: min,
        temperatureLimitMax: max,
      });
      limitsData.temperatureLimitMin = min;
      limitsData.temperatureLimitMax = max;
    }
  };

  useEffect(() => {
    if (limits) {
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
  }, [limits]);

  useEffect(() => {
    if (message) openNotification('bottomRight', message?.type);
  }, [message]);

  return (
    <div>
      <p className="text-2xl text-zinc-500">Temperature</p>
      {contextHolder}
      <div style={style}>
        {limitsData ? (
          <Slider
            range
            marks={marksTemp}
            defaultValue={limitsData ? [limitsData.temperatureLimitMin, limitsData.temperatureLimitMax] : [0, 50]}
            onAfterChange={onAfterChange}
            max={150}
          />
        ) : (
          <Skeleton active paragraph={false}>Loading...</Skeleton>
        )}
      </div>
    </div>
  );
};

export { Limits };
