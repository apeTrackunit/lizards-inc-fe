import { Card } from 'antd';
import React from 'react';

interface CardProps {
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
}

export const CardElement = (props: CardProps) => {
  return (
    <Card
      className={
        'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1 max-w-full overflow-x-auto ' +
        props.className
      }
    >
      {props.children}
    </Card>
  );
};
