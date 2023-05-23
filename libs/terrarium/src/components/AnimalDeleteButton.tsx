import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';

interface AnimalDeleteButtonProps {
  onClick?: (React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLButtonElement>) | undefined;
}
export const AnimalDeleteButton = ({ onClick }: AnimalDeleteButtonProps) => {
  return (
    <div className={'absolute right-5'}>
      <Button
        className={'flex flex-row justify-center items-center'}
        danger
        onClick={onClick}
        data-testid={'animal-delete-button'}
        icon={<DeleteOutlined rev={undefined} />}
      ></Button>
    </div>
  );
};
