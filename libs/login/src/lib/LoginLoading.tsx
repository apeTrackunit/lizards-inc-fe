import LizardLoading from './assets/lizardload.gif';

interface LoginLoadingProps {
  endOfLoadingCallback: () => void;
}

export const LoginLoading = ({ endOfLoadingCallback }: LoginLoadingProps) => {
  return (
    <div className={'h-screen w-full flex items-center justify-center'}>
      <img
        src={LizardLoading}
        onLoad={() => {
          setTimeout(endOfLoadingCallback, 2500);
        }}
        alt={'Loading Lizard'}
      />
    </div>
  );
};
