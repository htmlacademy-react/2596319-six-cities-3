import { offersSlice, setCity } from './offers-slice';
import {
  changeFavoritedStatusAction,
  fetchCommentsAction,
  fetchFavoritedOffersAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
  fetchSingleOfferAction,
} from '../api-actions';
import { CitiesConfig } from '../../const/const';
import { TOffer, TOfferExpanded, TReview } from '../../const/types';

const mockOffer1: TOffer = { id: '1', title: 'Offer 1', isFavorite: false } as TOffer;
const mockOffer2: TOffer = { id: '2', title: 'Offer 2', isFavorite: true } as TOffer;

const mockExpandedOffer: TOfferExpanded = {
  id: '1',
  title: 'Expanded Offer 1',
  isFavorite: false,
  description: 'A quiet place',
} as TOfferExpanded;

const mockReview: TReview = {
  id: 'r1',
  date: '2026-09-03',
  user: { name: 'Oliver', avatarUrl: '', isPro: false },
  comment: 'Great place!',
  rating: 5,
};

describe('offersSlice test', () => {
  const initialState = {
    city: CitiesConfig.DefaultCity,
    offers: [],
    isOffersLoading: false,
    favoritedOffers: [],
    currentOffer: null,
    reviews: [],
    nearOffers: [],
    isOfferLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should update city with "setCity" action', () => {
    const newCity = 'Paris';
    const result = offersSlice.reducer(initialState, setCity(newCity));

    expect(result.city).toBe(newCity);
  });

  describe('fetchOffersAction', () => {
    it('should set isOffersLoading to true on "pending"', () => {
      const action = { type: fetchOffersAction.pending.type };
      const result = offersSlice.reducer(initialState, action);

      expect(result.isOffersLoading).toBe(true);
    });

    it('should set offers and isOffersLoading to false on "fulfilled"', () => {
      const offers = [mockOffer1, mockOffer2];
      const action = { type: fetchOffersAction.fulfilled.type, payload: offers };
      const result = offersSlice.reducer({ ...initialState, isOffersLoading: true }, action);

      expect(result.offers).toEqual(offers);
      expect(result.isOffersLoading).toBe(false);
    });

    it('should set isOffersLoading to false on "rejected"', () => {
      const action = { type: fetchOffersAction.rejected.type };
      const result = offersSlice.reducer({ ...initialState, isOffersLoading: true }, action);

      expect(result.isOffersLoading).toBe(false);
    });
  });

  describe('fetchSingleOfferAction', () => {
    it('should set isOfferLoading to true on "pending"', () => {
      const action = { type: fetchSingleOfferAction.pending.type };
      const result = offersSlice.reducer(initialState, action);

      expect(result.isOfferLoading).toBe(true);
    });

    it('should set currentOffer and isOfferLoading to false on "fulfilled"', () => {
      const action = { type: fetchSingleOfferAction.fulfilled.type, payload: mockExpandedOffer };
      const result = offersSlice.reducer({ ...initialState, isOfferLoading: true }, action);

      expect(result.currentOffer).toEqual(mockExpandedOffer);
      expect(result.isOfferLoading).toBe(false);
    });

    it('should set currentOffer to null and isOfferLoading to false on "rejected"', () => {
      const action = { type: fetchSingleOfferAction.rejected.type };
      const result = offersSlice.reducer(
        { ...initialState, currentOffer: mockExpandedOffer, isOfferLoading: true },
        action
      );

      expect(result.currentOffer).toBeNull();
      expect(result.isOfferLoading).toBe(false);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should update reviews on "fulfilled"', () => {
      const reviews = [mockReview];
      const action = { type: fetchCommentsAction.fulfilled.type, payload: reviews };
      const result = offersSlice.reducer(initialState, action);

      expect(result.reviews).toEqual(reviews);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should update nearOffers on "fulfilled"', () => {
      const nearOffers = [mockOffer1, mockOffer2];
      const action = { type: fetchOffersNearbyAction.fulfilled.type, payload: nearOffers };
      const result = offersSlice.reducer(initialState, action);

      expect(result.nearOffers).toEqual(nearOffers);
    });
  });

  describe('fetchFavoritedOffersAction', () => {
    it('should update favoritedOffers on "fulfilled"', () => {
      const favoritedOffers = [mockOffer2];
      const action = { type: fetchFavoritedOffersAction.fulfilled.type, payload: favoritedOffers };
      const result = offersSlice.reducer(initialState, action);

      expect(result.favoritedOffers).toEqual(favoritedOffers);
    });
  });

  describe('changeFavoritedStatusAction', () => {
    it('should update offer in offers array and add to favoritedOffers when isFavorite is true', () => {
      const state = {
        ...initialState,
        offers: [mockOffer1],
        favoritedOffers: [],
      };
      const updatedOffer = { ...mockOffer1, isFavorite: true };
      const action = { type: changeFavoritedStatusAction.fulfilled.type, payload: updatedOffer };

      const result = offersSlice.reducer(state, action);

      expect(result.offers[0].isFavorite).toBe(true);
      expect(result.favoritedOffers).toContainEqual(updatedOffer);
    });

    it('should update offer in offers array and remove from favoritedOffers when isFavorite is false', () => {
      const favoritedOffer = { ...mockOffer1, isFavorite: true };
      const state = {
        ...initialState,
        offers: [favoritedOffer],
        favoritedOffers: [favoritedOffer],
      };
      const updatedOffer = { ...mockOffer1, isFavorite: false };
      const action = { type: changeFavoritedStatusAction.fulfilled.type, payload: updatedOffer };

      const result = offersSlice.reducer(state, action);

      expect(result.offers[0].isFavorite).toBe(false);
      expect(result.favoritedOffers).not.toContainEqual(updatedOffer);
    });
  });
});
