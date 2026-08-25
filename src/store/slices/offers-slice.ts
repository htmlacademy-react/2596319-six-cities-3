import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const/const';
import { TOffer } from '../../const/types';
import { changeFavoritedStatusAction, fetchFavoritedOffersAction, fetchOffersAction } from '../api-actions';

type OffersState = {
  city: string;
  offers: TOffer[];
  isOffersLoading: boolean;
  favoritedOffers: TOffer[];
};

const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  favoritedOffers: []
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
      });
  },
});

export const { setCity } = offersSlice.actions;
