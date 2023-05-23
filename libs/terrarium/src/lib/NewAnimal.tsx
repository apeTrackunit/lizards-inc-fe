import { Button, Form, Modal, notification, theme } from 'antd';
import { useEffect, useState } from 'react';
import { usePostRequest } from '@lizards-inc-fe/fetcher';
import { NewAnimalForm } from './NewAnimalForm';
import { IAnimal } from '@lizards-inc-fe/model';

type IAnimalInput = Omit<IAnimal, 'link'>;

export const NewAnimal = () => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<string>();

  const [api, contextHolder] = notification.useNotification();

  const { token } = theme.useToken();
  const [form] = Form.useForm<IAnimal>();
  const values = Form.useWatch([], form);

  const { isMutating, trigger } = usePostRequest<IAnimal, IAnimalInput>({ url: '/animals', data: values });

  useEffect(() => {
    form.setFieldValue('color', token.colorPrimary);
  }, [color]);

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button onClick={() => setOpen(true)}>Add animal</Button>
      <Modal
        title="New animal"
        open={open}
        confirmLoading={isMutating}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={onCancel}
        maskStyle={{ background: color, backdropFilter: 'blur(2px)' }}
      >
        <NewAnimalForm
          form={form}
          onCancel={onCancel}
          onSave={trigger}
          onColorChanged={setColor}
          notificationInstance={api}
        />
      </Modal>
    </>
  );
};
