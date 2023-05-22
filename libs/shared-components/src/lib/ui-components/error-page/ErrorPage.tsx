import ErrorLogo from '../../error-logo.png';
import React, { ReactNode } from 'react';

export interface ErrorPageProps {
  title: string;
  description: string;
  extraElement?: ReactNode;
}

export const ErrorPage = ({ title, description, extraElement }: ErrorPageProps) => {
  return (
    <div className={'w-full min-h-full flex flex-col gap-4 items-center justify-center'}>
      <div className={'text-4xl text-red-500'}>{title}</div>
      <p>{description}</p>
      <div>{extraElement}</div>
      <br />
      <br />
      <br />
      <div className={'flex justify-center items-center max-lg:flex-col italic'}>
        Don't forget to take this lizard with you, it decreases the chance of an error to occur again.
        <img src={ErrorLogo} alt={'error-logo'} className={'h-64'} />
      </div>
    </div>
  );
};
