import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import OfferPage from './offer-page';
import { AuthorizationStatus } from '../../const/const';
import * as reactRedux from 'react-redux';
import { TOfferExpanded } from '../../const/types';
import { AppDispatch } from '../../store/api-actions';

const mockOfferExpanded: TOfferExpanded = {
  id: '1',
  title: 'Beautiful Studio',
  type: 'apartment',
  price: 120,
  rating: 4.5,
  isPremium: true,
  isFavorite: false,
  description: 'Nice view',
  bedrooms: 2,
  maxAdults: 3,
  goods: ['Wi-Fi', 'Heating'],
  images: ['img/1.jpg', 'img/2.jpg'],
  host: { name: 'Angelina', avatarUrl: 'img/avatar.jpg', isPro: true },
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
};

const mockInitialState = {
  user: {
    userData: null,
  },
  offers: {
    favoritedOffers: [],
  },
};

type MockAction = { type?: string; payload?: unknown };

vi.mock('../../components/logo/logo', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('../../components/user-info/user-info', () => ({
  default: () => <div data-testid="user-info">UserInfo</div>,
}));

vi.mock('../../components/bookmark/bookmark', () => ({
  default: () => <button data-testid="bookmark">Bookmark</button>,
}));

vi.mock('../../components/review-form/review-form', () => ({
  default: () => <div data-testid="review-form">ReviewForm</div>,
}));

vi.mock('../../components/reviews-container/reviews-container', () => ({
  default: () => <div data-testid="reviews-container">ReviewsContainer</div>,
}));

vi.mock('../../components/hotels-map/hotels-map', () => ({
  default: () => <div data-testid="hotels-map">HotelsMap</div>,
}));

vi.mock('../../components/near-hotels/near-hotels', () => ({
  default: () => <div data-testid="near-hotels">NearHotels</div>,
}));

vi.mock('../not-found-page/not-found-page', () => ({
  default: () => <div data-testid="not-found-page">NotFoundPage</div>,
}));

vi.mock('../../components/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner">Spinner</div>,
}));

vi.mock('../../store/api-actions', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../store/api-actions')>();
  return {
    ...actual,
    fetchSingleOfferAction: Object.assign(
      vi.fn((id: string) => ({ type: 'offer/fetch/fulfilled', payload: mockOfferExpanded, meta: { arg: id } })),
      {
        fulfilled: {
          match: (action: { type?: string }) => action.type === 'offer/fetch/fulfilled',
        },
      }
    ),
    fetchCommentsAction: Object.assign(
      vi.fn((id: string) => ({ type: 'comments/fetch/fulfilled', payload: [], meta: { arg: id } })),
      {
        fulfilled: {
          match: (action: { type?: string }) => action.type === 'comments/fetch/fulfilled',
        },
      }
    ),
    fetchOffersNearbyAction: Object.assign(
      vi.fn((id: string) => ({ type: 'nearby/fetch/fulfilled', payload: [], meta: { arg: id } })),
      {
        fulfilled: {
          match: (action: { type?: string }) => action.type === 'nearby/fetch/fulfilled',
        },
      }
    ),
    fetchFavoritedOffersAction: Object.assign(
      vi.fn(() => ({ type: 'favorites/fetch/fulfilled', payload: [] })),
      {
        fulfilled: {
          match: (action: { type?: string }) => action.type === 'favorites/fetch/fulfilled',
        },
      }
    ),
  };
});

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

describe('Component: OfferPage', () => {
  it('should render Spinner when loading data', () => {
    const mockDispatch = vi.fn().mockReturnValue(new Promise(() => {})) as unknown as AppDispatch;
    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(reactRedux.useSelector).mockImplementation((selector: (state: typeof mockInitialState) => unknown) => selector(mockInitialState));

    render(
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage authorizationStatus={AuthorizationStatus.NoAuth} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render NotFoundPage when offer is not found', async () => {
    const mockDispatch = vi.fn((action: MockAction) => {
      if (typeof action === 'object' && action !== null) {
        if (action.type === 'offer/fetch/fulfilled') {
          return Promise.resolve({ type: 'offer/fetch/rejected', payload: null });
        }
        return Promise.resolve(action);
      }
      return Promise.resolve({ type: 'offer/fetch/rejected', payload: null });
    }) as unknown as AppDispatch;

    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(reactRedux.useSelector).mockImplementation((selector: (state: typeof mockInitialState) => unknown) => selector(mockInitialState));

    render(
      <MemoryRouter initialEntries={['/offer/non-existing-id']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage authorizationStatus={AuthorizationStatus.NoAuth} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
  });

  it('should render full offer details, reviews, and map when offer loaded successfully', async () => {
    const mockDispatch = vi.fn((action: MockAction) => Promise.resolve(action)) as unknown as AppDispatch;

    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(reactRedux.useSelector).mockImplementation((selector: (state: typeof mockInitialState) => unknown) => selector(mockInitialState));

    render(
      <MemoryRouter initialEntries={['/offer/1']}>
        <Routes>
          <Route path="/offer/:id" element={<OfferPage authorizationStatus={AuthorizationStatus.Auth} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Beautiful Studio')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
      expect(screen.getByTestId('reviews-container')).toBeInTheDocument();
      expect(screen.getByTestId('review-form')).toBeInTheDocument();
      expect(screen.getByTestId('hotels-map')).toBeInTheDocument();
      expect(screen.getByTestId('near-hotels')).toBeInTheDocument();
    });
  });
});
