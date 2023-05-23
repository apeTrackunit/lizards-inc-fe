import { DisplayDayFormat, IAnimal } from '@lizards-inc-fe/model';
import { Card } from 'antd';
import moment from 'moment';
import { AnimalDeleteButton } from './AnimalDeleteButton';
import { useDeleteRequest } from '@lizards-inc-fe/fetcher';

import { useState } from 'react';

interface AnimalCardProps {
  animal: IAnimal;
  triggerRefresh: () => void;
}

export const AnimalCard = ({ animal, triggerRefresh }: AnimalCardProps) => {
  const { trigger } = useDeleteRequest<unknown, unknown>({
    url: '/Animals/' + animal.id,
  });
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const getGender = (gender: string) => {
    switch (gender) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
      case 'O':
        return 'Other';
      default:
        return 'none';
    }
  };

  const concenatedAnimalName = animal.name.length > 40 ? animal.name.substring(0, 40) + '...' : animal.name;
  const bgColor = animal.color.length === 7 ? `${animal.color}41` : `${animal.color.substring(0, 7)}41`;

  const deleteOnClick = () => {
    setDeleteLoading(true);
    trigger().then(() => {
      setDeleteLoading(false);
      triggerRefresh();
    });
  };

  return (
    <Card className="h-40 shadow-lg" bodyStyle={{ height: '100%', padding: 16 }} style={{ backgroundColor: bgColor }}>
      <div className="h-full flex flex-col justify-between">
        <div>
          <AnimalDeleteButton onClick={deleteOnClick} isLoading={isDeleteLoading} />
          <div className="text-2xl w-10/12 font-semibold" title={animal.name}>
            {concenatedAnimalName}
          </div>
          <p> Species: {animal.species} </p>
        </div>
        <div className="w-full flex justify-between">
          <p>{getGender(animal.gender)}</p>
          <p className={'text-black/60'}>{moment(animal.dateOfBirth).format(DisplayDayFormat)}</p>
        </div>
      </div>
    </Card>
  );
};
