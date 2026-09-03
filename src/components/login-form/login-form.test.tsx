import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginForm from './login-form';
import * as reactRedux from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { APIAction } from '../../const/const';

vi.mock('../../store/api-actions', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../store/api-actions')>();
  const mockLoginAction = vi.fn((data: unknown) => ({ type: APIAction.Login, payload: data })) as unknown as typeof actual.loginAction;

  Object.assign(mockLoginAction, {
    fulfilled: {
      match: vi.fn(() => true),
    },
  });
  return {
    ...actual,
    loginAction: mockLoginAction,
  };
});

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('Component: LoginForm', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockReturnValue(
      Object.assign(Promise.resolve({ type: 'user/login/fulfilled' }), {
        unwrap: () => Promise.resolve(),
      })
    );
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
  });

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

  it('should enable submit button when valid email and password are typed', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    await userEvent.type(emailInput, 'user@test.com');
    await userEvent.type(passwordInput, 'pass123');

    expect(submitButton).toBeEnabled();
  });

  it('should dispatch loginAction when form is submitted with valid data', async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    await userEvent.type(emailInput, 'user@test.com');
    await userEvent.type(passwordInput, 'pass123');
    await userEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(loginAction).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'pass123',
    });
  });
});
