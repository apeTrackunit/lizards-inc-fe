import { Badge, Button, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';

export const NotificationCenter = () => {
  const data = [
    {
      message: 'The temperature exceeded the limits by 5°C.',
      dateTime: new Date('August 19, 2022 23:15:30 GMT+00:00'),
      isRead: false,
    },
    {
      message: 'The temperature exceeded the limits by 21°C.',
      dateTime: new Date('August 4, 2022 19:03:30 GMT+00:00'),
      isRead: true,
    },
    {
      message: 'The temperature exceeded the limits by 3°C.',
      dateTime: new Date('August 1, 2022 10:43:30 GMT+00:00'),
      isRead: true,
    },
    {
      message: 'The temperature exceeded the limits by 3°C.',
      dateTime: new Date('August 1, 2022 10:43:30 GMT+00:00'),
      isRead: true,
    },
    {
      message: 'The temperature exceeded the limits by 3°C.',
      dateTime: new Date('August 1, 2022 10:43:30 GMT+00:00'),
      isRead: true,
    },
    {
      message: 'The temperature exceeded the limits by 3°C.',
      dateTime: new Date('August 1, 2022 10:43:30 GMT+00:00'),
      isRead: true,
    },
    {
      message: 'The temperature exceeded the limits by 3°C.',
      dateTime: new Date('August 1, 2022 10:43:30 GMT+00:00'),
      isRead: true,
    },
  ];

  const notificationCount = useMemo(() => {
    return data.filter(x => !x.isRead).length;
  }, [data]);

  return (
    <Popover
      content={
        <div className={'sm:h-80 h-full sm:w-96 w-full overflow-y-scroll rounded-lg flex flex-col'}>
          {data.map((value, index) => {
            return <Notification key={index} dateTime={value.dateTime} message={value.message} isRead={value.isRead} />;
          })}
        </div>
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

interface INotification {
  message: string;
  dateTime: Date;
  isRead: boolean;
}
const Notification = ({ message, dateTime, isRead }: INotification) => {
  return (
    <div className={'flex items-center justify-between h-fit gap-4 w-full p-4 hover:bg-slate-100'}>
      <div className={'flex flex-col gap-1'}>
        <span className={'grow'}>{message}</span>
        <span className={'text-xs text-slate-700'}>
          {dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString()}
        </span>
      </div>
      {!isRead && <Badge color={'blue'} />}
    </div>
  );
};
