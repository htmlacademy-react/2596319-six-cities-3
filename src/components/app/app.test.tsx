import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import App from './app';
import { AppRoute, AuthorizationStatus } from '../../const/const';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const defaultStoreState = {
  offers: {
    isOffersLoading: false,
    favoritedOffers: [],
    offers: [],
    city: 'Paris',
  },
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null,
  },
};

describe('Component: App', () => {
  it('should show Spinner component when isOffersLoading == true', () => {
    const store = mockStore({
      ...defaultStoreState,
      offers: { ...defaultStoreState.offers, isOffersLoading: true },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  });

  it('should show MainPage component when routed to AppRoute.Main', () => {
    const store = mockStore(defaultStoreState);

    window.history.pushState({}, '', AppRoute.Main);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should show LoginPage component when routed to AppRoute.Login', () => {
    const store = mockStore(defaultStoreState);

    window.history.pushState({}, '', AppRoute.Login);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show FavoritesPage component when routed to AppRoute.Favorites if user is logged in', () => {
    const store = mockStore({
      ...defaultStoreState,
      user: { authorizationStatus: AuthorizationStatus.Auth, userData: null },
    });

    window.history.pushState({}, '', AppRoute.Favorites);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should show LoginPage component when routed to AppRoute.Favorites if user is not logged in', () => {
    const store = mockStore(defaultStoreState);

    window.history.pushState({}, '', AppRoute.Favorites);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.queryByText(/Nothing yet saved/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show NotFoundPage component when routed to an unknown route', () => {
    const store = mockStore(defaultStoreState);

    window.history.pushState({}, '', '/non-existent-route');

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
