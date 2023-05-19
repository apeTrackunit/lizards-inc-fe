export const DisplayDateFormat = 'YYYY-MM-DD HH:mm:ss';
export const DisplayDayFormat = 'YYYY-MM-DD';

export interface ValueTypeConfig {
  format: (value: number) => string;
  hexColor: string;
}

export const DisplayConfig: { temperature: ValueTypeConfig; humidity: ValueTypeConfig; co2: ValueTypeConfig } = {
  temperature: {
    format: temperature => roundValue(temperature, 2) + ' °C',
    hexColor: '#e30000',
  },
  humidity: {
    format: humidity => roundValue(humidity, 2) + ' %',
    hexColor: '#00f',
  },
  co2: {
    format: co2 => roundValue(co2, 2) + ' ppm',
    hexColor: '#00b700',
  },
};

export const roundValue = (value: number, decimals: number) => {
  const tenPower = Math.pow(10, decimals);
  return Math.round(value * tenPower) / tenPower;
};
