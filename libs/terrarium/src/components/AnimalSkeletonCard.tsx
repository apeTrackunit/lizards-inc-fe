import { Card, Skeleton } from 'antd';

export const AnimalSkeletonCard = () => {
  return (
    <Card className="h-40 shadow-lg" bodyStyle={{ height: '100%', padding: 16 }} style={{ backgroundColor: 'white' }}>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="text-2xl w-10/12 font-semibold">
            <Skeleton active={true} />
          </div>
        </div>
      </div>
    </Card>
  );
};
