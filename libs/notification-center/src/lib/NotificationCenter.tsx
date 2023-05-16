import { Badge, Button, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import moment from 'moment/moment';

interface INotification {
  id: string;
  dateTime: Date;
  message: string;
  status: true;
}

export const NotificationCenter = () => {
  const { data, isLoading } = useGetRequest<INotification[]>({ url: '/Notifications' });

  const notificationCount = useMemo(() => {
    return data?.filter(x => !x.status).length ?? 0;
  }, [data]);

  return (
    <Popover
      content={
        !isLoading ? (
          <div className={'sm:h-80 h-full sm:w-96 w-full overflow-y-scroll rounded-lg flex flex-col'}>
            {data?.map(value => {
              return (
                <Notification key={value.id} dateTime={value.dateTime} message={value.message} status={value.status} />
              );
            })}
          </div>
        ) : (
          <span>Loading...</span>
        )
      }
      trigger="click"
      placement="bottomRight"
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

interface NotificationProps {
  dateTime: Date;
  message: string;
  status: true;
}

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
