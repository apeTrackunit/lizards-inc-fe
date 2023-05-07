import ErrorLogo from '../error-logo.png';

export const NotFoundPage = () => {
  return (
    <div className={'w-full h-full flex flex-col gap-4 items-center justify-center'}>
      <img src={ErrorLogo} alt={'error-logo'} className={'h-64'} />
      <div className={'text-2xl'}>Error 404 - Page not found</div>
      <p>Use side menu to navigate in the app</p>
    </div>
  );
};
