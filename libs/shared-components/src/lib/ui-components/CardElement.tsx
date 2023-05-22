import React, { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
  isHoverAnimated?: boolean;
}

export const CardElement = (props: CardProps) => {
  const hoverAnimation = props.isHoverAnimated
    ? 'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1 '
    : '';

  return (
    <div className={'border border-black/10 p-6 rounded-md ' + hoverAnimation + props.className}>{props.children}</div>
  );
};
