import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import MainPage from './main-page';
import { AuthorizationStatus } from '../../const/const';
import * as reactRedux from 'react-redux';
import { TOffer } from '../../const/types';

vi.mock('../../components/logo/logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../../components/user-info/user-info', () => ({
  default: () => <div data-testid="user-info">UserInfo</div>,
}));

vi.mock('../../components/cities-tabs/cities-tabs', () => ({
  default: () => <div data-testid="cities-tabs">CitiesTabs</div>,
}));

vi.mock('../../components/hotels/hotels', () => ({
  default: () => <div data-testid="hotels">Hotels</div>,
}));

vi.mock('../../components/hotels-map/hotels-map', () => ({
  default: () => <div data-testid="hotels-map">HotelsMap</div>,
}));

vi.mock('../../components/empty-main-page/empty-main-page', () => ({
  default: () => <div data-testid="empty-main-page">EmptyMainPage</div>,
}));

vi.mock('../../components/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner">Spinner</div>,
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

const mockOffer: TOffer = {
  id: '1',
  title: 'Test Hotel',
  type: 'apartment',
  price: 100,
  rating: 4,
  isPremium: false,
  isFavorite: false,
  previewImage: 'img/1.jpg',
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
};

describe('Component: MainPage', () => {
  it('should render Spinner when isOffersLoading is true', () => {
    vi.mocked(reactRedux.useDispatch).mockReturnValue(vi.fn());
    vi.mocked(reactRedux.useSelector).mockImplementation((selector) =>
      selector({
        offers: {
          isOffersLoading: true,
          city: 'Paris',
          offers: [],
          favoritedOffers: [],
        },
        user: { userData: null },
      })
    );

    render(
      <MemoryRouter>
        <MainPage authorizationStatus={AuthorizationStatus.NoAuth} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render EmptyMainPage when offersInCity is empty', () => {
    vi.mocked(reactRedux.useDispatch).mockReturnValue(vi.fn());
    vi.mocked(reactRedux.useSelector).mockImplementation((selector) =>
      selector({
        offers: {
          isOffersLoading: false,
          city: 'Paris',
          offers: [],
          favoritedOffers: [],
        },
        user: { userData: null },
      })
    );

    render(
      <MemoryRouter>
        <MainPage authorizationStatus={AuthorizationStatus.NoAuth} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('empty-main-page')).toBeInTheDocument();
    expect(screen.queryByTestId('hotels')).not.toBeInTheDocument();
  });

  it('should render main content with hotels and map when offersInCity is not empty', () => {
    vi.mocked(reactRedux.useDispatch).mockReturnValue(vi.fn());
    vi.mocked(reactRedux.useSelector).mockImplementation((selector) =>
      selector({
        offers: {
          isOffersLoading: false,
          city: 'Paris',
          offers: [mockOffer],
          favoritedOffers: [],
        },
        user: { userData: null },
      })
    );

    render(
      <MemoryRouter>
        <MainPage authorizationStatus={AuthorizationStatus.NoAuth} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByTestId('cities-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('hotels')).toBeInTheDocument();
    expect(screen.getByTestId('hotels-map')).toBeInTheDocument();
  });
});
