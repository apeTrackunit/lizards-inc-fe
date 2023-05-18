import { Card, Skeleton, Statistic } from 'antd';

interface MeasurementCardProps {
  isLoading: boolean;
  title: string;
  icon: string;
  value: string;
  cardClassName: string;
}

export const MeasurementCard = ({ isLoading, title, icon, value, cardClassName }: MeasurementCardProps) => {
  return (
    <Card className={cardClassName}>
      {isLoading ? (
        <>
          <span className={'text-black/[.45] skeleton-title'}>{title}</span>
          <div className={'flex items-center pt-2'}>
            <img src={icon} alt={title + '-logo'} className={'h-8 mr-2'} />
            <Skeleton paragraph={false} active={true}></Skeleton>
          </div>
        </>
      ) : (
        <Statistic
          title={title}
          value={value}
          prefix={<img src={icon} alt={title + '-logo'} className={'h-8 mr-2'} />}
          valueStyle={{ alignItems: 'center', display: 'flex', fontWeight: '500' }}
        />
      )}
    </Card>
  );
};
