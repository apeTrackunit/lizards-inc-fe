import { AuthProvider } from '@lizards-inc-fe/auth';
import { render } from '@testing-library/react';
import { Limits } from './Limits';

jest.mock('react-router-dom');

describe('Limits component', () => {
  it('renders temperature slider with default values when loading', () => {
    const limitsData = undefined;
    const limitsLoading = true;

    const { container } = render(
      <AuthProvider>
        <Limits limitsData={limitsData} limitsLoading={limitsLoading} />
      </AuthProvider>
    );

    expect(container.querySelector('.ant-slider-handle')).toBeNull();
  });

  it('renders temperature slider with provided values when not loading', () => {
    const limitsData = {
      id: '1',
      temperatureLimitMin: 10,
      temperatureLimitMax: 90,
    };
    const limitsLoading = false;

    const { container, queryByText } = render(
      <AuthProvider>
        <Limits limitsData={limitsData} limitsLoading={limitsLoading} />
      </AuthProvider>
    );

    const sliderHandles = container.querySelectorAll('.ant-slider-handle') as NodeListOf<HTMLElement>;
    expect(sliderHandles.length).toBe(2);
    expect(sliderHandles[0].style.left).toBe((10 * 2) / 3 + '%');
    expect(sliderHandles[1].style.left).toBe((90 * 2) / 3 + '%');

    expect(queryByText('Loading...')).toBeNull();
  });
});
