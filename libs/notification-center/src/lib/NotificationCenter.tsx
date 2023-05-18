import { Badge, Button, Popover, Spin } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useGetRequest, usePutRequest } from '@lizards-inc-fe/fetcher';
import moment from 'moment/moment';

interface INotification {
  id: string;
  dateTime: Date;
  message: string;
  status: true;
}

interface NotificationSeen {
  ids: string[];
}

export const NotificationCenter = () => {
  const { data, isLoading, mutate } = useGetRequest<INotification[]>({ url: '/Notifications' });

  const notificationCount = useMemo(() => {
    return data?.filter(x => !x.status).length ?? 0;
  }, [data]);

  return (
    <Popover
      content={
        <div
          className={
            'sm:h-80 h-full sm:w-96 w-full overflow-y-scroll rounded-lg flex flex-col ' +
            (isLoading || (!isLoading && (data?.length === 0 || !data)) ? 'items-center justify-center' : '')
          }
        >
          {isLoading && <Spin size="large" />}

          {!isLoading && (data?.length === 0 || !data) && <span>No data</span>}

          {!isLoading &&
            data?.map((value, index) => {
              return (
                <Notification
                  key={value.id}
                  id={value.id}
                  dateTime={value.dateTime}
                  message={value.message}
                  status={value.status}
                  onMarkedAsSeen={mutate}
                />
              );
            })}
        </div>
      }
      trigger="click"
      placement="bottomRight"
    >
      <Button
        shape="circle"
        type={'text'}
        ghost
        className={'flex flex-col justify-center items-center'}
        icon={
          <Badge
            offset={[notificationCount > 9 ? 10 : 2, 0]}
            size={'small'}
            count={notificationCount}
            overflowCount={9}
            className={'mb-1'}
            title={'Notifications'}
          >
            <BellOutlined />
          </Badge>
        }
      />
    </Popover>
  );
};

interface NotificationProps extends INotification {
  onMarkedAsSeen: () => void;
}

const Notification = ({ id, message, dateTime, status, onMarkedAsSeen }: NotificationProps) => {
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
      {!status && <Badge color={'blue'} />}
    </div>
  );
};
