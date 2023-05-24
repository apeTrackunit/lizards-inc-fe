import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { IAnimal, ITerrarium } from '@lizards-inc-fe/model';
import { Divider, Skeleton } from 'antd';
import { AnimalCard } from '../components/AnimalCard';
import { AnimalSkeletonCard } from '../components/AnimalSkeletonCard';
import { NewAnimal } from '../components/NewAnimal';

export const Terrarium = () => {
  const { data: terrariumData, isLoading: isTerrariumDataLoading } = useGetRequest<ITerrarium>({ url: '/Terrarium' });
  const {
    data: animalData,
    isLoading: isAnimalsLoading,
    mutate: refreshAnimals,
  } = useGetRequest<IAnimal[]>({ url: '/Animals' });

  return (
    <>
      <div className={'flex flex-row justify-start'}>
        {!isTerrariumDataLoading ? (
          <h1 className={'text-2xl font-bold'}>{terrariumData?.name ?? 'Terrarium'}</h1>
        ) : (
          <Skeleton active={true} paragraph={false} className={'w-24'} />
        )}
      </div>
      <Divider></Divider>
      {animalData && animalData.length === 0 && <div className={'text-xl mb-4 ml-2'}>Add a new animal!</div>}
      <div className={'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative'}>
        {animalData && !isAnimalsLoading ? (
          <>
            <NewAnimal />
            {animalData.length > 0 &&
              animalData.map(animal => <AnimalCard animal={animal} triggerRefresh={refreshAnimals} />)}
          </>
        ) : (
          <>
            <AnimalSkeletonCard />
            <AnimalSkeletonCard />
            <AnimalSkeletonCard />
          </>
        )}
      </div>
    </>
  );
};

export default Terrarium;
