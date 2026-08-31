import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import FavoritesPage from './favorites-page';
import * as reactRedux from 'react-redux';
import { TOffer } from '../../const/types';

vi.mock('../../components/logo/logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../../components/user-info/user-info', () => ({
  default: () => <div data-testid="user-info">UserInfo</div>,
}));

vi.mock('../../components/favorited-hotels/favorited-hotels', () => ({
  default: () => <div data-testid="favorited-hotels">FavoritedHotels</div>,
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

const mockFavoritedOffers: TOffer[] = [
  {
    id: '1',
    title: 'Favorite Hotel 1',
    type: 'apartment',
    price: 120,
    rating: 4.8,
    isPremium: true,
    isFavorite: true,
    previewImage: 'img/1.jpg',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
];

describe('Component: FavoritesPage', () => {
  it('should render empty favorites page when favoritedOffers is empty', () => {
    const mockDispatch = vi.fn();
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(reactRedux.useSelector).mockImplementation((selector) =>
      selector({
        user: { userData: null },
        offers: { favoritedOffers: [] },
      })
    );

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText('Save properties to narrow down search or plan your future trips.')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('favorited-hotels')).not.toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should render list of favorited hotels when favoritedOffers is not empty', () => {
    const mockDispatch = vi.fn();
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(reactRedux.useSelector).mockImplementation((selector) =>
      selector({
        user: { userData: null },
        offers: { favoritedOffers: mockFavoritedOffers },
      })
    );

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('favorited-hotels')).toBeInTheDocument();
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalled();
  });
});
