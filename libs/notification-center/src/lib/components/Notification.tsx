import { usePutRequest } from '@lizards-inc-fe/fetcher';
import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import { Badge } from 'antd';

export interface INotification {
  id: string;
  dateTime: Date;
  message: string;
  status: boolean;
}

export interface NotificationSeen {
  ids: string[];
}

interface NotificationProps extends INotification {
  onMarkedAsSeen: () => void;
}

export const Notification = ({ id, message, dateTime, status, onMarkedAsSeen }: NotificationProps) => {
  const { trigger, response } = usePutRequest<unknown, NotificationSeen>({
    url: '/Notifications',
    data: {
      ids: [id],
    },
  });

  useEffect(() => {
    response?.status === 200 && onMarkedAsSeen();
  }, [response, onMarkedAsSeen]);

  const markAsSeen = useCallback(() => {
    !status &&
      setTimeout(() => {
        trigger();
      }, 500);
  }, [trigger, status]);

  return (
    <div
      id={`notification-${id}`}
      className={`flex items-center justify-between h-fit gap-4 w-full p-4 hover:bg-slate-100`}
      onMouseEnter={markAsSeen}
      onClick={markAsSeen}
    >
      <div className={'flex flex-col gap-1'}>
        <span className={'grow'}>{message}</span>
        <span className={'text-xs text-slate-700'}>{moment(dateTime).fromNow()}</span>
      </div>
      {!status ? <Badge color={'blue'} /> : <Badge color={'transparent'} />}
    </div>
  );
};
