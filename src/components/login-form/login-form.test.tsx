import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './login-form';

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

describe('Component: LoginForm', () => {
  it('should render form elements correctly in initial state', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
