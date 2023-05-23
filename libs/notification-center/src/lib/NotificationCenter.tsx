import { Badge, Button, Popover, Spin } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { INotification, Notification } from './components/Notification';

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
          {isLoading && (
            <div data-testid={'spinner'}>
              <Spin size="large" />
            </div>
          )}

          {!isLoading && (data?.length === 0 || !data) && <span>No data</span>}

          {!isLoading &&
            data?.map(value => {
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
            <BellOutlined rev={undefined} />
          </Badge>
        }
      />
    </Popover>
  );
};
