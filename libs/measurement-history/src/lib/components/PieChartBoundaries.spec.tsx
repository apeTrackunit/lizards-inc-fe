import React from 'react';
import { render } from '@testing-library/react';
import { PieChartBoundaries, IPieChartBoundariesData } from './PieChartBoundaries';

describe('PieChartBoundaries', () => {
  const sampleData: IPieChartBoundariesData[] = [
    { name: 'A', data: 50, color: '#ff0000' },
    { name: 'B', data: 30, color: '#00ff00' },
    { name: 'C', data: 20, color: '#0000ff' },
  ];

  it('renders title correctly', () => {
    const { getByText } = render(<PieChartBoundaries title="Sample Title" />);
    expect(getByText('Sample Title')).toBeTruthy();
  });

  it('renders skeleton when data is undefined', () => {
    const { container } = render(<PieChartBoundaries title="Sample Title" />);
    expect(container.querySelector('.ant-skeleton')).toBeTruthy();
  });

  it('renders pie chart when data is provided', () => {
    const { container } = render(<PieChartBoundaries title="Sample Title" data={sampleData} />);

    expect(container.querySelector('.recharts-wrapper')).toBeTruthy();
    expect(container.querySelectorAll('.recharts-pie-sector').length).toBe(sampleData.length);
  });

  it('applies correct fill colors to cells', () => {
    const { container } = render(<PieChartBoundaries title="Sample Title" data={sampleData} />);

    const cells = container.querySelectorAll('.recharts-pie-sector');
    expect(cells[0].querySelector('path')?.getAttribute('fill')).toBe('#ff0000');
    expect(cells[1].querySelector('path')?.getAttribute('fill')).toBe('#00ff00');
    expect(cells[2].querySelector('path')?.getAttribute('fill')).toBe('#0000ff');
  });

  it('renders legend aligned to the left', () => {
    const { container } = render(<PieChartBoundaries title="Sample Title" data={sampleData} />);
    const legend = container.querySelector('.recharts-default-legend');

    expect(legend).toBeTruthy();
    expect((legend as HTMLElement).style.textAlign).toBe('left');
  });
});
