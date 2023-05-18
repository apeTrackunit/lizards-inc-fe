import React from 'react';
import { render } from '@testing-library/react';
import { LimitsAndBoundaries } from './LimitsAndBoundaries';
import { AuthProvider } from '@lizards-inc-fe/auth';

describe('LimitsAndBoundaries', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <LimitsAndBoundaries />
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
