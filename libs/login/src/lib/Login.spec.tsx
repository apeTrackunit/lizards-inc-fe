import { render } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Login />);
    expect(baseElement).toBeTruthy();
  });
});

describe('Card', () => {
  it('should render the card and components successfully', () => {
    const { baseElement } = render(<Login />);
    const loginCard = baseElement.id.localeCompare('login-card');
    const loginTitle = baseElement.querySelector('.ant-typography');
    const loginIcon = baseElement.id.localeCompare('user-icon');
    const loginButton = baseElement.id.localeCompare('login-button');

    expect(loginCard).toBeTruthy();
    if (loginTitle == null) return;
    expect(loginTitle.textContent).toBe('ReptiMate');
    expect(loginButton).toBeTruthy();
    expect(loginIcon).toBeTruthy();
  });
});
