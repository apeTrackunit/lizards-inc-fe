import React from 'react';
import { getAllByText, render } from '@testing-library/react';
import { PieChartDiagramsCard, PieChartDataState } from './PieChartDiagramsCard';

describe('PieChartDiagramsCard', () => {
  const sampleData: PieChartDataState = {
    temperatureData: [
      { name: 'Category A', data: 30, color: '#FF0000' },
      { name: 'Category B', data: 40, color: '#00FF00' },
      { name: 'Category C', data: 30, color: '#0000FF' },
    ],
    humidityData: [
      { name: 'Low', data: 10, color: '#FF0000' },
      { name: 'Medium', data: 50, color: '#00FF00' },
      { name: 'High', data: 40, color: '#0000FF' },
    ],
    co2Data: [
      { name: 'Safe', data: 70, color: '#FF0000' },
      { name: 'Moderate', data: 20, color: '#00FF00' },
      { name: 'Dangerous', data: 10, color: '#0000FF' },
    ],
  };

  it('renders pie chart diagrams with correct data', () => {
    const { getAllByText } = render(<PieChartDiagramsCard diagramData={sampleData} />);

    expect(getAllByText('Temperature').length).toBeGreaterThan(0);
    expect(getAllByText('Humidity').length).toBeGreaterThan(0);
    expect(getAllByText('CO2').length).toBeGreaterThan(0);
  });

  it('renders skeleton loaders when data is undefined', () => {
    const { baseElement } = render(<PieChartDiagramsCard diagramData={undefined} />);

    expect(baseElement.querySelectorAll('.ant-skeleton-avatar').length).toBe(4);
    // 4 = 3 desktop skeletons + 1 mobile view tab skeleton
  });
});
