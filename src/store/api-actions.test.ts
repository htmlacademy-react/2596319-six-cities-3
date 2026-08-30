import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action, Middleware } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { createApi } from '../api';
import {
  fetchOffersAction,
  fetchSingleOfferAction,
  fetchOffersNearbyAction,
  fetchFavoritedOffersAction,
  changeFavoritedStatusAction,
  fetchCommentsAction,
  postCommentAction,
  checkAuthorizationStatusAction,
  loginAction,
  logoutAction,
  State,
  AppDispatch,
} from './api-actions';
import { APIRoute } from '../const/const';

describe('Async actions', () => {
  const api: AxiosInstance = createApi();
  const mockAxios = new MockAdapter(api);

  const middleware: Middleware[] = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action<string>>(middleware);

  beforeEach(() => {
    mockAxios.reset();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server returns 200', async () => {
      const mockOffers = [{ id: '1', title: 'Test Offer' }];
      mockAxios.onGet(APIRoute.Offers).reply(200, mockOffers);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(fetchOffersAction());

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchSingleOfferAction', () => {
    it('should dispatch "fetchSingleOfferAction.pending" and "fetchSingleOfferAction.fulfilled" when server returns 200', async () => {
      const mockOffer = { id: '1', title: 'Test Single Offer' };
      const offerId = '1';
      mockAxios.onGet(APIRoute.Offer.replace('{offerId}', offerId)).reply(200, mockOffer);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(fetchSingleOfferAction(offerId));

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        fetchSingleOfferAction.pending.type,
        fetchSingleOfferAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should dispatch "fetchOffersNearbyAction.pending" and "fetchOffersNearbyAction.fulfilled" when server returns 200', async () => {
      const mockOffersNearby = [{ id: '2', title: 'Test Nearby Offer' }];
      const offerId = '1';
      mockAxios.onGet(APIRoute.OffersNearby.replace('{offerId}', offerId)).reply(200, mockOffersNearby);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(fetchOffersNearbyAction(offerId));

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchFavoritedOffersAction', () => {
    it('should dispatch "fetchFavoritedOffersAction.pending" and "fetchFavoritedOffersAction.fulfilled" when server returns 200', async () => {
      const mockFavoritedOffers = [{ id: '1', isFavorite: true }];
      mockAxios.onGet(APIRoute.FavoritedOffers).reply(200, mockFavoritedOffers);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(fetchFavoritedOffersAction());

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        fetchFavoritedOffersAction.pending.type,
        fetchFavoritedOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('changeFavoritedStatusAction', () => {
    it('should dispatch "changeFavoritedStatusAction.pending" and "changeFavoritedStatusAction.fulfilled" on status change', async () => {
      const mockOffer = { id: '1', isFavorite: true };
      const payload = { offerId: '1', status: 1 };

      mockAxios
        .onPost(
          APIRoute.ChangeFavoritedStatus
            .replace('{offerId}', payload.offerId)
            .replace('{status}', String(payload.status))
        )
        .reply(200, mockOffer);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(changeFavoritedStatusAction(payload));

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        changeFavoritedStatusAction.pending.type,
        changeFavoritedStatusAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.fulfilled" when server returns 200', async () => {
      const mockComments = [{ id: 'c1', comment: 'Nice place' }];
      const offerId = '1';
      mockAxios.onGet(APIRoute.Comments.replace('{offerId}', offerId)).reply(200, mockComments);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(fetchCommentsAction(offerId));

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
    });
  });

  describe('postCommentAction', () => {
    it('should dispatch "postCommentAction.pending" and "postCommentAction.fulfilled" on successful comment posting', async () => {
      const mockComment = { id: 'c1', comment: 'Great place!', rating: 5 };
      const commentData = { offerId: '1', comment: 'Great place!', rating: 5 };

      mockAxios
        .onPost(APIRoute.Comments.replace('{offerId}', commentData.offerId))
        .reply(200, mockComment);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(postCommentAction(commentData));

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
    });
  });

  describe('checkAuthorizationStatusAction', () => {
    it('should dispatch "checkAuthorizationStatusAction.pending" and "checkAuthorizationStatusAction.fulfilled" when authorized', async () => {
      const mockUserData = { email: 'user@test.com', token: 'fake-token' };
      mockAxios.onGet(APIRoute.Login).reply(200, mockUserData);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(checkAuthorizationStatusAction());

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        checkAuthorizationStatusAction.pending.type,
        checkAuthorizationStatusAction.fulfilled.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" on successful login', async () => {
      const fakeUser = { email: 'test@test.com', token: 'secret-token' };
      const fakeAuthData = { email: 'test@test.com', password: 'password123' };

      mockAxios.onPost(APIRoute.Login).reply(200, fakeUser);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(loginAction(fakeAuthData));

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" on logout', async () => {
      mockAxios.onDelete(APIRoute.Logout).reply(204);

      const store = mockStore();
      await (store.dispatch as AppDispatch)(logoutAction());

      const actions = store.getActions().map((action: Action<string>) => action.type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });
  });
});
