import { notification, Skeleton, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { marksTemp } from './MarksAndStyle';
import { ILimits } from './Interfaces';
import { ExtractValues } from './ExtractValues';
import { usePutRequest } from '@lizards-inc-fe/fetcher';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface INotificationState {
  message: string;
  type: NotificationType;
}

export const Limits = ({ limitsData }: { limitsData: ILimits | undefined; limitsLoading: boolean }) => {
  const [api, contextHolder] = notification.useNotification();
  const { trigger } = usePutRequest<unknown, ILimits>({
    url: '/Terrarium/limits',
    data: limitsData,
  });
  const [message, setMessage] = useState<INotificationState>();
  const [limits, setLimits] = useState<ILimits | undefined>();

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
      trigger()
        .then(response => {
          if (response) {
            setMessage({ message: 'Changes successfully saved!', type: 'success' });
          } else {
            setMessage({ message: 'Something went wrong!', type: 'error' });
          }
        })
        .catch(() => {
          setMessage({ message: 'Something went very wrong!', type: 'error' });
        });
    }
  }, [trigger, limits]);

  useEffect(() => {
    if (message) {
      api[message?.type]({
        message: message?.message,
        placement: 'bottomRight',
      });
    }
  }, [api, message]);

  return (
    <div>
      <p className="text-lg text-zinc-500">
        Temperature ({limitsData?.temperatureLimitMin} - {limitsData?.temperatureLimitMax})
      </p>
      {contextHolder}

      <div className={'w-full'}>
        {limitsData ? (
          <Slider
            range
            marks={marksTemp}
            defaultValue={limitsData ? [limitsData.temperatureLimitMin, limitsData.temperatureLimitMax] : [0, 50]}
            onAfterChange={onAfterChange}
            max={150}
          />
        ) : (
          <Skeleton active paragraph={false}>
            Loading...
          </Skeleton>
        )}
      </div>
    </div>
  );
};
