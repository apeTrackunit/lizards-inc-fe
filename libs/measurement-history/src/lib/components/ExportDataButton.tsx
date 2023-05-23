import { Button } from 'antd';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import { IMeasurement, roundValue } from '@lizards-inc-fe/model';
import moment from 'moment';

interface exportDataButtonProps {
  measuredData: IMeasurement[] | undefined;
}
export const ExportDataButton = ({ measuredData }: exportDataButtonProps) => {
  const [exporting, setExporting] = useState(false);
  const exportData = () => {
    if (measuredData === undefined || measuredData.length === 0) {
      return;
    }
    setExporting(true);
    const csvData = convertToCSV(measuredData);
    downloadCSV(csvData);
    setExporting(false);
  };

  return (
    <Button onClick={exportData} disabled={exporting || measuredData === undefined || measuredData.length === 0}>
      {exporting ? 'Exporting...' : 'Download history'}
    </Button>
  );
};

const convertToCSV = (data: IMeasurement[]) => {
  const headers = ['Date', 'Temperature', 'Humidity', 'CO2'];
  const rows = data.map(d => [
    moment(d.dateTime).format('HH:mm:ss YYYY-MM-DD'),
    roundValue(d.temperature, 2),
    roundValue(d.humidity, 2),
    roundValue(d.co2, 2),
  ]);

  const csvContent = headers.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');
  return csvContent;
};

const downloadCSV = (csvData: string) => {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'History of measured data.csv');
};
