import { MeasurementCard } from './MeasurementCard';
import { DiagramData, DiagramLine, MeasurementDiagramWithReferenceLine } from './MeasurementDiagramWithReferenceLine';
import { Button, Card } from 'antd';
import { useEffect, useMemo, useState } from 'react';

// card configuration
interface CardConfig {
  icon: string;
  cardColor: string;
}

// diagram configuration
interface DiagramConfig {
  hexColor: string;
}

interface MeasurementBoundaries {
  min: number;
  max: number;
}

// data
interface UserData {
  measurementData: number | undefined;
  measurementDisplayData: string | undefined;
  historyMeasurements: DiagramData[] | undefined;
  boundaries: MeasurementBoundaries | undefined;
}

interface MeasurementContainerProps {
  title: string;
  cardConfig: CardConfig;
  diagramConfig: DiagramConfig;
  userData: UserData;
}

export const MeasurementContainer = ({ title, cardConfig, diagramConfig, userData }: MeasurementContainerProps) => {
  const [diagramVisible, setDiagramVisible] = useState(false);
  const [warningText, setWarningText] = useState<string>();
  const [boundaryLines, setBoundaryLines] = useState<DiagramLine[]>([]);

  const boundaryLineMin: DiagramLine = useMemo(
    () => ({
      label: 'Min',
      y: userData.boundaries?.min,
      color: '#f00',
    }),
    [userData.boundaries?.min]
  );

  const boundaryLineMax: DiagramLine = useMemo(
    () => ({
      label: 'Max',
      y: userData.boundaries?.max,
      color: '#f00',
    }),
    [userData.boundaries?.max]
  );

  useEffect(() => {
    if (userData.boundaries !== undefined) {
      setBoundaryLines([boundaryLineMin, boundaryLineMax]);
    }

    if (userData.boundaries && userData.measurementData) {
      if (userData.boundaries.min > userData.measurementData) {
        setWarningText(title + ' minimum limit has been reached!');
      }
      if (userData.boundaries.max < userData.measurementData) {
        setWarningText(title + ' maximum limit has been reached!');
      }
    }
  }, [title, userData.boundaries, userData.measurementData, boundaryLineMax, boundaryLineMin]);

  const toggleDiagram = () => setDiagramVisible(prevState => !prevState);

  return (
    <Card className={'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1 lg:w-96 w-full'}>
      <div className={'flex flex-col items-center justify-center gap-4'}>
        <MeasurementCard
          isLoading={userData.measurementData == null}
          title={title}
          icon={cardConfig.icon}
          value={userData.measurementDisplayData ?? ''}
          cardClassName={cardConfig.cardColor + ' lg:w-80 w-full mx-4 h-fit border-box'}
        />
        {warningText == null ? (
          <div className={'hidden xl:block'}>
            <br />
          </div>
        ) : (
          <div className={'font-bold text-rose-500'}>{warningText}</div>
        )}

        <span className={'hidden xl:block w-full pl-8'}>History</span>
        <Button onClick={toggleDiagram} className={'xl:hidden'}>
          History Diagram
        </Button>
        <div
          data-testid={'measurement-diagram'}
          className={'xl:block -translate-x-4' + (diagramVisible ? ' block' : ' hidden')}
        >
          <MeasurementDiagramWithReferenceLine
            height={250}
            width={350}
            dataName={title}
            dataColor={diagramConfig.hexColor}
            isLoading={userData.historyMeasurements == null}
            data={userData.historyMeasurements}
            lines={boundaryLines}
          />
        </div>
      </div>
    </Card>
  );
};
