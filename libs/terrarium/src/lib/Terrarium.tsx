import { useGetRequest } from '@lizards-inc-fe/fetcher';
import { ITerrarium } from '@lizards-inc-fe/model';
import { Divider } from 'antd';

export const Terrarium = () => {
  const { data: terrariumData } = useGetRequest<ITerrarium>({ url: '/Terrarium' });

  return (
    <>
      <div>
        <h1 className={'text-3xl'}>{terrariumData?.name}</h1>
      </div>
      <Divider></Divider>
    </>
  );
};

export default Terrarium;
