import { Badge, Button, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
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
  const { trigger, response } = usePutRequest<unknown, NotificationSeen>({
    url: '/Notifications',
    data: {
      ids: data?.filter(x => !x.status).map(x => x.id) ?? [],
    },
  });

  const notificationCount = useMemo(() => {
    return data?.filter(x => !x.status).length ?? 0;
  }, [data]);

  const handleOpen = (visible: boolean) => {
    if (visible) {
      trigger();
      if (response?.status === 200) {
        mutate();
      }
    }
  };

  return (
    <Popover
      content={
        <div className={'sm:h-80 h-full sm:w-96 w-full overflow-y-scroll rounded-lg flex flex-col'}>
          {!isLoading ? (
            data?.map(value => {
              return (
                <Notification
                  key={value.id}
                  id={value.id}
                  dateTime={value.dateTime}
                  message={value.message}
                  status={value.status}
                />
              );
            })
          ) : (
            <span>Loading...</span>
          )}
        </div>
      }
      trigger="click"
      placement="bottomRight"
      onOpenChange={handleOpen}
    >
      <Button
        shape="circle"
        type={'text'}
        className={'flex flex-col justify-center items-center'}
        ghost
        icon={
          <Badge
            offset={[notificationCount > 9 ? 10 : 2, 0]}
            size={'small'}
            count={notificationCount}
            overflowCount={9}
          >
            <BellOutlined />
          </Badge>
        }
      />
    </Popover>
  );
};

type NotificationProps = INotification;

const Notification = ({ message, dateTime, status }: NotificationProps) => {
  return (
    <div className={'flex items-center justify-between h-fit gap-4 w-full p-4 hover:bg-slate-100'}>
      <div className={'flex flex-col gap-1'}>
        <span className={'grow'}>{message}</span>
        <span className={'text-xs text-slate-700'}>{moment(dateTime).fromNow()}</span>
      </div>
      {!status && <Badge color={'blue'} />}
    </div>
  );
};
