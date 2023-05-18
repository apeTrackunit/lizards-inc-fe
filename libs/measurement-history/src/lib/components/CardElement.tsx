import { Card } from 'antd';
import React, { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
}

export const CardElement = (props: CardProps) => {
  return (
    <Card className={'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1 ' + props.className}>
      {props.children}
    </Card>
  );
};
