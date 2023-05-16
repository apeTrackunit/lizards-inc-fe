import { MeasurementCard } from './MeasurementCard';
import { DiagramData, DiagramLine, MeasurementDiagramWithReferenceLine } from './MeasurementDiagramWithReferenceLine';
import { Button, Card } from 'antd';
import { useState } from 'react';

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

  const boundaryLines: DiagramLine[] = [];
  let warningText: string | null = null;

  // setting up diagram lines
  if (userData.boundaries != undefined) {
    const boundaryLineMin: DiagramLine = {
      label: 'Min',
      y: userData.boundaries.min,
      color: '#f00',
    };

    const boundaryLineMax: DiagramLine = {
      label: 'Max',
      y: userData.boundaries.max,
      color: '#f00',
    };

    boundaryLines.push(boundaryLineMin);
    boundaryLines.push(boundaryLineMax);
  }

  if (userData.boundaries != undefined && userData.measurementData != undefined) {
    if (userData.boundaries.min >= userData.measurementData) {
      warningText = title + ' minimum limit has been reached!';
    }
    if (userData.boundaries.max <= userData.measurementData) {
      warningText = title + ' maximum limit has been reached!';
    }
  }

  const toggleDiagram = () => setDiagramVisible(prevState => !prevState);

  return (
    <Card className={'shadow-sm hover:shadow-lg transition ease-in-out hover:-translate-y-1 w-96'}>
      <div className={'flex flex-col items-center justify-center gap-4'}>
        <MeasurementCard
          isLoading={userData.measurementData == null}
          title={title}
          icon={cardConfig.icon}
          value={userData.measurementDisplayData ?? ''}
          cardClassName={cardConfig.cardColor + ' w-80 h-fit border-box'}
        />
        {warningText == null ? (
          <div className={'hidden xl:block'}>
            <br />
          </div>
        ) : (
          <div className={'font-bold text-rose-500'}>{warningText}</div>
        )}

        <Button onClick={toggleDiagram} className={'xl:hidden'}>
          Diagram
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
