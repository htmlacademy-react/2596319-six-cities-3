import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './login-page';

vi.mock('../../components/logo/logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../../components/login-form/login-form', () => ({
  default: () => <div data-testid="login-form">LoginForm</div>,
}));

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

vi.mock('../../utils/utils', () => ({
  getRandomInteger: () => 0,
}));

describe('Component: LoginPage', () => {
  it('should render Logo, LoginForm and random city link correctly', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Paris/i })).toBeInTheDocument();
  });
});
