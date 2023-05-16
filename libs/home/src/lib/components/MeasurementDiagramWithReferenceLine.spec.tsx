import React from 'react';
import { render } from '@testing-library/react';
import { MeasurementDiagramWithReferenceLine, DiagramLine, DiagramData } from './MeasurementDiagramWithReferenceLine';

describe('MeasurementDiagramWithReferenceLine', () => {
  it('should render', () => {
    const lines: DiagramLine[] = [
      { y: 20, color: '#ff0000', label: 'Reference Line 1' },
      { y: 30, color: '#00ff00', label: 'Reference Line 2' },
    ];

    const { baseElement } = render(
      <MeasurementDiagramWithReferenceLine
        isLoading={true}
        height={300}
        width={400}
        lines={lines}
        data={undefined}
        dataColor="#0000ff"
        dataName="Measurement Data"
      />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render loading state when isLoading is true', () => {
    const lines: DiagramLine[] = [
      { y: 20, color: '#ff0000', label: 'Reference Line 1' },
      { y: 30, color: '#00ff00', label: 'Reference Line 2' },
    ];

    const { baseElement } = render(
      <MeasurementDiagramWithReferenceLine
        isLoading={true}
        height={300}
        width={400}
        lines={lines}
        data={undefined}
        dataColor="#0000ff"
        dataName="Measurement Data"
      />
    );

    const skeletonAvatar = baseElement.querySelector('.ant-skeleton');
    expect(skeletonAvatar).toBeTruthy();
  });

  it('should render chart with reference lines and data when isLoading is false', () => {
    const lines: DiagramLine[] = [
      { y: 20, color: '#ff0000', label: 'Reference Line 1' },
      { y: 30, color: '#00ff00', label: 'Reference Line 2' },
    ];

    const data: DiagramData[] = [
      { name: 'Jan', data: 15 },
      { name: 'Feb', data: 25 },
      { name: 'Mar', data: 20 },
      { name: 'Mar', data: 40 },
    ];

    const { getByText } = render(
      <MeasurementDiagramWithReferenceLine
        isLoading={false}
        height={300}
        width={400}
        lines={lines}
        data={data}
        dataColor="#0000ff"
        dataName="Measurement Data"
      />
    );

    expect(getByText('Reference Line 1')).toBeTruthy();
    expect(getByText('Reference Line 2')).toBeTruthy();
    expect(getByText('Measurement Data')).toBeTruthy();
  });

  it('should render chart without reference lines when lines are empty', () => {
    const data: DiagramData[] = [
      { name: 'Jan', data: 15 },
      { name: 'Feb', data: 25 },
      { name: 'Mar', data: 20 },
    ];

    const { findByText, queryAllByTestId } = render(
      <MeasurementDiagramWithReferenceLine
        isLoading={false}
        height={300}
        width={400}
        lines={[]}
        data={data}
        dataColor="#0000ff"
        dataName="Measurement Data"
      />
    );

    expect(findByText('Measurement Data')).toBeTruthy();

    const chartLines = queryAllByTestId('line');
    expect(chartLines).toHaveLength(0);
  });
});
