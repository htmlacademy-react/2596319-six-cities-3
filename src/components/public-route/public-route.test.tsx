import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { PublicRoute } from './public-route';
import { AuthorizationStatus } from '../../const/const';
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

describe('Component: PublicRoute', () => {
  it('should render Spinner when authorizationStatus is Unknown (AuthorizationStatus.Unknown is active)', () => {
    vi.mocked(reactRedux.useSelector).mockReturnValue(AuthorizationStatus.Unknown);

    render(
      <MemoryRouter>
        <PublicRoute>
          <div>Public Content</div>
        </PublicRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
  });

  it('should render children when authorizationStatus is NoAuth (AuthorizationStatus.NoAuth is active)', () => {
    vi.mocked(reactRedux.useSelector).mockReturnValue(AuthorizationStatus.NoAuth);

    render(
      <MemoryRouter>
        <PublicRoute>
          <div>Public Content</div>
        </PublicRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Public Content')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should redirect to Main route (/) when authorizationStatus is Auth (AuthorizationStatus.Auth is active)', () => {
    vi.mocked(reactRedux.useSelector).mockReturnValue(AuthorizationStatus.Auth);

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div>Public Content</div>
              </PublicRoute>
            }
          />
          <Route path="/" element={<div>Main Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
  });
});
