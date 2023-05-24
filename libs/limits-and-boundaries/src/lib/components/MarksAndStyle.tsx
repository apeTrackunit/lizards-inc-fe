import { SliderMarks } from 'antd/es/slider';
import { DisplayConfig } from '@lizards-inc-fe/model';

export const marksTemp: SliderMarks = {
  0: {
    label: DisplayConfig.temperature.format(0),
  },
  50: {
    label: DisplayConfig.temperature.format(50),
  },
  100: {
    label: DisplayConfig.temperature.format(100),
  },
  150: {
    label: DisplayConfig.temperature.format(150),
  },
};

export const marksHum: SliderMarks = {
  0: {
    label: DisplayConfig.humidity.format(0),
  },
  100: {
    label: DisplayConfig.humidity.format(100),
  },
};

export const marksCO2: SliderMarks = {
  0: {
    label: DisplayConfig.co2.format(0),
  },
  10000: {
    label: DisplayConfig.co2.format(10000),
  },
};
