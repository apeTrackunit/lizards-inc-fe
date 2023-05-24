import { Form, Modal, notification } from 'antd';
import { useState } from 'react';
import { usePostRequest } from '@lizards-inc-fe/fetcher';
import { NewAnimalForm } from './NewAnimalForm';
import { IAnimal } from '@lizards-inc-fe/model';
import { PlusOutlined } from '@ant-design/icons';

type IAnimalInput = Omit<IAnimal, 'link'>;

export const NewAnimal = () => {
  const [open, setOpen] = useState(false);
  const [bgColor, setBgColor] = useState<string>();

  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm<IAnimal>();
  const values = Form.useWatch([], form);

  const { isMutating, trigger } = usePostRequest<IAnimal, IAnimalInput>({ url: '/Animals', data: values });

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <button className="h-40 shadow-lg bg-slate-100 hover:bg-slate-200 p-4 rounded-lg" onClick={() => setOpen(true)}>
        <div className={'flex flex-row gap-3 justify-center items-center w-full h-full'}>
          <PlusOutlined className={'text-xl'} rev={undefined} />
          <span className={'font-normal mt-1.5 text-lg'}>New Animal</span>
        </div>
      </button>

      <Modal
        title="New animal"
        open={open}
        confirmLoading={isMutating}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={onCancel}
        maskStyle={{ background: bgColor, backdropFilter: 'blur(2px)' }}
      >
        <NewAnimalForm
          form={form}
          onCancel={onCancel}
          onSave={trigger}
          onColorChanged={setBgColor}
          notificationInstance={api}
        />
      </Modal>
    </>
  );
};
