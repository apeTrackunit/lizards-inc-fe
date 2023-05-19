import { CSSProperties } from 'react';
import { SliderMarks } from 'antd/es/slider';

export const style: CSSProperties = {
  marginLeft: 70,
  marginRight: 70,
  marginTop: 20,
};

export const marksTemp: SliderMarks = {
  0: {
    label: '0°C',
  },
  50: {
    label: '50°C',
  },
  100: {
    label: '100°C',
  },
  150: {
    label: '150°C',
  },
};

export const marksHum: SliderMarks = {
  0: {
    label: '0%',
  },
  100: {
    label: '100%',
  },
};

export const marksCO2: SliderMarks = {
  0: {
    label: '0%',
  },
  100: {
    label: '100%',
  },
};
