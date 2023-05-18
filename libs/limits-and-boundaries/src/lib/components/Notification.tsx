import React from 'react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { Button, notification } from 'antd';
import {useGetRequest, usePutRequest} from "@lizards-inc-fe/fetcher";
import {IBoundaries} from "./Interfaces";

const Notification = () =>{
    const { data: boundariesData, isLoading: boundariesLoading, mutate : mutateBoundaries } = useGetRequest<IBoundaries>({
        url: 'Terrarium/boundaries',
    });
  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement, type: NotificationType) => {
    api[type]({
      message: 'Changes successfully saved!',
      placement,
    });
  };

  const { trigger, response } = usePutRequest<unknown, IBoundaries>({
      url: '/Terrarium/boundaries',
      data: {
          "id": '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          "temperatureBoundaryMax": 11,
          "temperatureBoundaryMin": 0,
          "humidityBoundaryMax": 0,
          "humidityBoundaryMin": 0,
          "cO2BoundaryMax": 0,
          "cO2BoundaryMin": 0
      },
  });

    const handlePut = () => {
        console.log("Trigger")
        trigger().then(()=>{
            console.log(response?.data)
        })
    };

    return (
    <div className="flex flex-row-reverse">
        {contextHolder}
        <Button
          className="rounded-none bg-[#91caff] px-6 h-min"
          onClick={() => {
              handlePut()
              openNotification('bottomRight', 'success')
          }}
        >
          <div className="mx-6 my-1 text-xl">Save</div>
        </Button>
    </div>
  );
}

export default Notification;
