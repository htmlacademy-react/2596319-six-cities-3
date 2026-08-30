import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { PrivateRoute } from './private-route';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import * as reactRedux from 'react-redux';

vi.mock('../spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

describe('Component: PrivateRoute', () => {
  it('should render Spinner when authorizationStatus is Unknown (AuthorizationStatus.Unknown is active)', () => {
    vi.mocked(reactRedux.useSelector).mockReturnValue(AuthorizationStatus.Unknown);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children when authorizationStatus is Auth (AuthorizationStatus.Auth is active)', () => {
    vi.mocked(reactRedux.useSelector).mockReturnValue(AuthorizationStatus.Auth);

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should redirect to Login route when authorizationStatus is NoAuth (AuthorizationStatus.NoAuth is active)', () => {
    vi.mocked(reactRedux.useSelector).mockReturnValue(AuthorizationStatus.NoAuth);

    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <div>Protected Content</div>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
