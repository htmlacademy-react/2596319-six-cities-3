import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesConfig } from '../../const/const';
import { TOffer, TOfferExpanded, TReview } from '../../const/types';
import { changeFavoritedStatusAction, fetchCommentsAction, fetchFavoritedOffersAction, fetchOffersAction, fetchOffersNearbyAction, fetchSingleOfferAction } from '../api-actions';

type OffersState = {
  city: string;
  offers: TOffer[];
  isOffersLoading: boolean;
  favoritedOffers: TOffer[];
  currentOffer: TOfferExpanded | null;
  reviews: TReview[];
  nearOffers: TOffer[];
  isOfferLoading: boolean;
};

const initialState: OffersState = {
  city: CitiesConfig.DefaultCity,
  offers: [],
  isOffersLoading: false,
  favoritedOffers: [],
  currentOffer: null,
  reviews: [],
  nearOffers: [],
  isOfferLoading: false
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeFavoritedStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        const index = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (index !== -1) {
          state.offers[index] = updatedOffer;
        }

        if (updatedOffer.isFavorite) {
          state.favoritedOffers.push(updatedOffer);
        } else {
          state.favoritedOffers = state.favoritedOffers.filter(
            (offer) => offer.id !== updatedOffer.id
          );
        }
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchFavoritedOffersAction.fulfilled, (state, action) => {
        state.favoritedOffers = action.payload;
      })
      .addCase(fetchSingleOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchSingleOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchSingleOfferAction.rejected, (state) => {
        state.currentOffer = null;
        state.isOfferLoading = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });
  },
});

export const { setCity } = offersSlice.actions;
