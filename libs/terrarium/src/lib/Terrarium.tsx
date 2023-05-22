import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { IAnimal, ITerrarium } from '@lizards-inc-fe/model';
import { Divider, Skeleton } from 'antd';

export const Terrarium = () => {
  const { data: terrariumData, isLoading: isTerrariumDataLoading } = useGetRequest<ITerrarium>({ url: '/Terrarium' });
  const { data: animalData } = useGetRequest<IAnimal>({ url: '/Animals' });

  return (
    <>
      <div>
        {!isTerrariumDataLoading ? (
          <h1 className={'text-3xl'}>{terrariumData?.name}</h1>
        ) : (
          <Skeleton active={true} paragraph={false} />
        )}
      </div>
      <Divider></Divider>
    </>
  );
};

export default Terrarium;
