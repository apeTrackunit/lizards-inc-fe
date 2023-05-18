import { Card } from 'antd';
import React, { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
}

export const CardElement = (props: CardProps) => {
  return (
    //shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1
    <div className={'border border-black/10 p-6 rounded-md ' + props.className}>{props.children}</div>
  );
};
