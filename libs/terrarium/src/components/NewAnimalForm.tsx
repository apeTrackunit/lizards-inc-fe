import { DatePicker, Form, Input, ColorPicker, Radio, FormInstance, Button, theme } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { useEffect, useMemo, useState } from 'react';
import { IAnimal } from '@lizards-inc-fe/model';
import dayjs from 'dayjs';
import { NotificationInstance } from 'antd/es/notification/interface';
import { AxiosResponse } from 'axios';
import { useGetRequest } from '@lizards-inc-fe/fetcher';

interface NewAnimalFormProps {
  form: FormInstance<IAnimal>;
  onCancel: () => void;
  onSave: () => Promise<AxiosResponse<IAnimal, unknown> | undefined>;
  onColorChanged: (value: string) => void;
  notificationInstance: NotificationInstance;
}

export const NewAnimalForm = ({ form, onSave, onCancel, onColorChanged, notificationInstance }: NewAnimalFormProps) => {
  const { token } = theme.useToken();

  const [submittable, setSubmittable] = useState(false);
  const [color, setColor] = useState<Color | string>();

  const values = Form.useWatch([], form);

  const { mutate } = useGetRequest<IAnimal[]>({ url: '/Animals' });

  useEffect(() => {
    form.setFieldValue('color', token.colorPrimary);
    setColor(token.colorPrimary);
  }, []);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  const colorText = useMemo<string>(
    () => (typeof color === 'string' ? color : color?.toHexString() ?? token.colorPrimary),
    [color]
  );

  useEffect(() => {
    onColorChanged(colorText.length === 7 ? `${colorText}20` : `${colorText.substring(0, 7)}20`);
  }, [onColorChanged, colorText]);

  const onSaveForm = () => {
    onSave()
      .then(() => {
        onCancel();
        notificationInstance.success({
          message: `Animal was successfully created!`,
          placement: 'bottomRight',
        });

        form.resetFields();
        setColor(token.colorPrimary);

        mutate();
      })
      .catch(() => {
        notificationInstance.error({
          message: `Something went wrong!`,
          description: `Please try it again later.`,
          placement: 'bottomRight',
        });
      });
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onSaveForm}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the animal's name!" }]}>
          <Input maxLength={35} />
        </Form.Item>

        <Form.Item
          label="Species"
          name="species"
          rules={[{ required: true, message: "Please input the animal's species!" }]}
        >
          <Input maxLength={35} />
        </Form.Item>

        <Form.Item
          label="Date of birth"
          name="dateOfBirth"
          rules={[{ required: true, message: "Please input the animal's date of birth!" }]}
        >
          <DatePicker disabledDate={date => date.isAfter(dayjs())} />
        </Form.Item>

        <Form.Item label="Color" name="color" rules={[{ required: true, message: "Please input the animal's color!" }]}>
          <div className={'flex gap-2 items-center'}>
            <ColorPicker
              value={color}
              onChange={value => {
                setColor(value.toHexString());
                form.setFieldValue('color', value.toHexString());
              }}
              format={'hex'}
            />
            {colorText}
          </div>
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input the animal's gender!" }]}
        >
          <Radio.Group>
            <Radio value={'M'}>Male</Radio>
            <Radio value={'F'}>Female</Radio>
            <Radio value={'O'}>Other</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <div className={'flex flex-row gap-4 w-full justify-center'}>
        <Button onClick={onCancel}>Back</Button>
        <Button
          type={'default'}
          className={'bg-[#1677ff] text-white'}
          htmlType={'submit'}
          disabled={!submittable}
          onSubmit={onSaveForm}
          onClick={onSaveForm}
        >
          Save
        </Button>
      </div>
    </>
  );
};
