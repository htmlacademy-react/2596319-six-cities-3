import { offersSlice, setCity } from './offers-slice';
import { changeFavoritedStatusAction, fetchFavoritedOffersAction, fetchOffersAction } from '../api-actions';
import { DEFAULT_CITY } from '../../const/const';
import { TOffer } from '../../const/types';

const mockOffer1: TOffer = { id: '1', title: 'Offer 1', isFavorite: false } as TOffer;
const mockOffer2: TOffer = { id: '2', title: 'Offer 2', isFavorite: true } as TOffer;

describe('offersSlice test', () => {
  const initialState = {
    city: DEFAULT_CITY,
    offers: [],
    isOffersLoading: false,
    favoritedOffers: [],
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
      expect(result.favoritedOffers).not.toEqual(updatedOffer);
    });
  });
});
