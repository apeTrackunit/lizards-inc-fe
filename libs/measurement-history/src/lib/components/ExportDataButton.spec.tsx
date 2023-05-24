import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { saveAs } from 'file-saver';
import { ExportDataButton } from './ExportDataButton';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('ExportDataButton component', () => {
  const measuredData = [
    { id: '1', dateTime: new Date('2023-05-20'), temperature: 25, humidity: 60, co2: 400 },
    { id: '2', dateTime: new Date('2023-05-21'), temperature: 28, humidity: 55, co2: 500 },
  ];

  it('renders the export button', () => {
    const { getByRole } = render(<ExportDataButton measuredData={measuredData} />);
    const exportButton = getByRole('button');

    expect(exportButton).toBeTruthy();
  });

  it('disables the export button when measuredData is undefined', () => {
    const { getByRole } = render(<ExportDataButton measuredData={undefined} />);
    const exportButton = getByRole('button');

    expect(exportButton.getAttributeNames()).toContain('disabled');
  });

  it('disables the export button when measuredData is an empty array', () => {
    const { getByRole } = render(<ExportDataButton measuredData={[]} />);
    const exportButton = getByRole('button');

    expect(exportButton.getAttributeNames()).toContain('disabled');
  });

  it('enables the export button when measuredData is not empty', () => {
    const { getByRole } = render(<ExportDataButton measuredData={measuredData} />);
    const exportButton = getByRole('button');

    expect(exportButton.getAttributeNames()).not.toContain('disabled');
  });

  it('calls the downloadCSV function and disables the button when clicked', async () => {
    const { getByRole } = render(<ExportDataButton measuredData={measuredData} />);
    const exportButton = getByRole('button');

    fireEvent.click(exportButton);

    expect(saveAs).toHaveBeenCalledTimes(1);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'History of measured data.csv');
  });
});
