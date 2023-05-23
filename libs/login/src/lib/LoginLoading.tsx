import LizardLoading from './assets/lizardload.gif';

export const LoginLoading = () => {
  return (
    <div className={'h-screen w-full flex items-center justify-center'}>
      <img src={LizardLoading} alt={'Loading Lizard'} />
    </div>
  );
};
