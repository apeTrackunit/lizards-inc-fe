import React from 'react';
import { SliderMarks } from 'antd/es/slider';

const style: React.CSSProperties = {
  marginLeft: 70,
  marginRight: 70,
  marginTop: 20,
};

const marksTemp: SliderMarks = {
  0: {
    label: '0°C',
  },
  50: {
    label: '50°C',
  },
  100: {
    label: '100°C',
  },
};

const marksHum: SliderMarks = {
  0: {
    label: '0%',
  },
  100: {
    label: '100%',
  },
};

const marksCO2: SliderMarks = {
  0: {
    label: '0%',
  },
  100: {
    label: '100%',
  },
};

export { marksTemp };
export { marksHum };
export { marksCO2 };
export { style };
