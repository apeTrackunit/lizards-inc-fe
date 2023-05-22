import React from 'react';
import { render } from '@testing-library/react';
import { CardElement } from './CardElement';

describe('CardElement', () => {
  it('renders children', () => {
    const { getByText } = render(
      <CardElement>
        <span>Test Children</span>
      </CardElement>
    );

    expect(getByText('Test Children')).toBeTruthy();
  });

  it('applies custom class name', () => {
    const { baseElement } = render(
      <CardElement className="custom-class">
        <span>Test Children</span>
      </CardElement>
    );

    expect(baseElement.querySelector('.custom-class')).toBeTruthy();
  });

  it('applies hover animation when isHoverAnimated is true', () => {
    const { baseElement } = render(
      <CardElement isHoverAnimated={true} className={'test-class'}>
        <span>Test Children</span>
      </CardElement>
    );

    const cardElement = baseElement.querySelector('.test-class') as HTMLElement;

    expect(cardElement).toBeTruthy();
    expect(cardElement.classList).toContain('hover:shadow-lg');
    expect(cardElement.classList).toContain('hover:-translate-y-1');
  });

  it('does not apply hover animation when isHoverAnimated is false', () => {
    const { baseElement } = render(
      <CardElement isHoverAnimated={false} className={'test-class'}>
        <span>Test Children</span>
      </CardElement>
    );

    const cardElement = baseElement.querySelector('.test-class') as HTMLElement;

    expect(cardElement).toBeTruthy();
    expect(cardElement.classList).not.toContain('hover:shadow-lg');
    expect(cardElement.classList).not.toContain('hover:-translate-y-1');
  });
});
