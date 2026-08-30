import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import MemoizedBookmark from './bookmark';
import { AuthorizationStatus } from '../../const/const';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../../store/api-actions', async () => {
  const actual = await vi.importActual<typeof import('../../store/api-actions')>('../../store/api-actions');
  return {
    ...actual,
    changeFavoritedStatusAction: vi.fn(),
  };
});

describe('Component: Bookmark', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  const createMockStore = (authStatus: AuthorizationStatus) =>
    configureStore({
      reducer: {
        user: () => ({ authorizationStatus: authStatus }),
      },
    });

  it('should render correctly', () => {
    const store = createMockStore(AuthorizationStatus.Auth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedBookmark offerId="1" isFavorite={false} />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');

    expect(button).toHaveClass('place-card__bookmark-button');
    expect(button).not.toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '19');
  });

  it('should add "place-card__bookmark-button--active" class when isFavorite == true', () => {
    const store = createMockStore(AuthorizationStatus.Auth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedBookmark offerId="1" isFavorite />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveClass('place-card__bookmark-button--active');
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should render with correct class name + correct width/height attributes when forOfferPage == true', () => {
    const store = createMockStore(AuthorizationStatus.Auth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedBookmark offerId="1" isFavorite={false} forOfferPage />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');

    expect(button).toHaveClass('offer__bookmark-button');
    expect(svg).toHaveAttribute('width', '31');
    expect(svg).toHaveAttribute('height', '33');
  });
});
