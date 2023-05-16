import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MeasurementContainer } from './MeasurementContainer';

describe('MeasurementContainer', () => {
  it('should render without errors', () => {
    const cardConfig = {
      icon: 'temperature-icon.png',
      cardColor: 'blue',
    };

    const diagramConfig = {
      hexColor: '#ff0000',
    };

    const userData = {
      measurementData: 25,
      measurementDisplayData: '25°C',
      historyMeasurements: [],
      boundaries: {
        min: 0,
        max: 100,
      },
    };

    const { baseElement } = render(
      <MeasurementContainer
        title="Temperature"
        cardConfig={cardConfig}
        diagramConfig={diagramConfig}
        userData={userData}
      />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render measurement card with correct props', () => {
    const cardConfig = {
      icon: 'temperature-icon.png',
      cardColor: 'blue',
    };

    const diagramConfig = {
      hexColor: '#ff0000',
    };

    const userData = {
      measurementData: 25,
      measurementDisplayData: '25°C',
      historyMeasurements: [],
      boundaries: {
        min: 0,
        max: 100,
      },
    };

    const { getByText, getByAltText, getAllByText } = render(
      <MeasurementContainer
        title="Temperature"
        cardConfig={cardConfig}
        diagramConfig={diagramConfig}
        userData={userData}
      />
    );

    expect(getAllByText('Temperature')).toBeTruthy();
    expect(getAllByText('Temperature').length).toBeGreaterThan(0);
    expect(getByAltText('Temperature-logo')).toBeTruthy();
    expect(getByText('25°C')).toBeTruthy();
  });

  it('should toggle diagram visibility when button is clicked', () => {
    const cardConfig = {
      icon: 'temperature-icon.png',
      cardColor: 'blue',
    };

    const diagramConfig = {
      hexColor: '#ff0000',
    };

    const userData = {
      measurementData: 25,
      measurementDisplayData: '25°C',
      historyMeasurements: [],
      boundaries: {
        min: 0,
        max: 100,
      },
    };

    const { getByText, getByTestId } = render(
      <MeasurementContainer
        title="Temperature"
        cardConfig={cardConfig}
        diagramConfig={diagramConfig}
        userData={userData}
      />
    );

    const toggleButton = getByText('Diagram');

    // Initially, diagram is hidden
    expect(getByTestId('measurement-diagram').classList).toContain('hidden');

    // Click the toggle button
    fireEvent.click(toggleButton);

    // Diagram should be visible
    expect(getByTestId('measurement-diagram').classList).not.toContain('hidden');

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Diagram should be hidden again
    expect(getByTestId('measurement-diagram').classList).toContain('hidden');
  });

  it('should render the component with warning text - minimum', () => {
    const title = 'Temperature';
    const cardConfig = {
      icon: 'temperature-icon',
      cardColor: 'blue',
    };
    const diagramConfig = {
      hexColor: '#ff0000',
    };
    const userData = {
      measurementData: 20,
      measurementDisplayData: '20°C',
      historyMeasurements: [],
      boundaries: {
        min: 30,
        max: 50,
      },
    };

    const { getByText } = render(
      <MeasurementContainer title={title} cardConfig={cardConfig} diagramConfig={diagramConfig} userData={userData} />
    );

    expect(getByText(`${title} minimum limit has been reached!`)).toBeTruthy();
  });

  it('should render the component with warning text - maximum', () => {
    const title = 'Temperature';
    const cardConfig = {
      icon: 'temperature-icon',
      cardColor: 'blue',
    };
    const diagramConfig = {
      hexColor: '#ff0000',
    };
    const userData = {
      measurementData: 60,
      measurementDisplayData: '60°C',
      historyMeasurements: [],
      boundaries: {
        min: 0,
        max: 50,
      },
    };

    const { getByText } = render(
      <MeasurementContainer title={title} cardConfig={cardConfig} diagramConfig={diagramConfig} userData={userData} />
    );

    expect(getByText(`${title} maximum limit has been reached!`)).toBeTruthy();
  });
});
