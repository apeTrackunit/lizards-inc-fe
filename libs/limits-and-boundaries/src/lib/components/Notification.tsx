import React, { useMemo } from 'react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { Button, notification } from 'antd';

function Notification() {
  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const Context = React.createContext({ text: 'Default' });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement, type: NotificationType) => {
    api[type]({
      message: <Context.Consumer>{({ text }) => text}</Context.Consumer>,
      placement,
    });
  };

  const contextValue = useMemo(() => ({ text: 'Changes successfully saved!' }), []);

  return (
    <div className="flex flex-row-reverse">
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Button
          className="rounded-none bg-[#91caff] px-6 h-min"
          onClick={() => openNotification('bottomRight', 'success')}
        >
          <div className="mx-6 my-1 text-xl">Save</div>
        </Button>
      </Context.Provider>
    </div>
  );
}

export default Notification;
