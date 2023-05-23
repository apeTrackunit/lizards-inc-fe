import { ExportDataButton } from './ExportDataButton';
import { render } from '@testing-library/react';
import { IMeasurement } from '@lizards-inc-fe/model';

describe('ExportDataButton', () => {
  test('should render the button correctly', () => {
    const { getByText } = render(<ExportDataButton measuredData={[]} />);
    const button = getByText('Download history');
    expect(button).toBeTruthy();
  });

  test('should disable the button if data is undefined', async () => {
    const { baseElement } = render(<ExportDataButton measuredData={undefined} />);
    expect(baseElement.querySelector('button')?.getAttributeNames()).toContain('disabled');
  });

  test('should enable the button if data is not undefined', () => {
    const measurementData: IMeasurement[] = [
      {
        id: '1',
        temperature: 12,
        humidity: 24,
        co2: 36,
        dateTime: new Date(),
      },
    ];
    const { baseElement } = render(<ExportDataButton measuredData={measurementData} />);
    expect(baseElement.querySelector('button')?.getAttributeNames()).not.toContain('disabled');
  });
});
