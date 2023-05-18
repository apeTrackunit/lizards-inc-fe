export const DisplayDateFormat = 'YYYY-MM-DD HH:mm:ss';
export const DisplayDayFormat = 'YYYY-MM-DD';

export interface ValueTypeConfig {
  format: (value: number) => string;
  hexColor: string;
}

export const DisplayConfig: { temperature: ValueTypeConfig; humidity: ValueTypeConfig; co2: ValueTypeConfig } = {
  temperature: {
    format: temperature => temperature + ' °C',
    hexColor: '#e30000',
  },
  humidity: {
    format: temperature => temperature + ' %',
    hexColor: '#00f',
  },
  co2: {
    format: temperature => temperature + ' ppm',
    hexColor: '#00b700',
  },
};
