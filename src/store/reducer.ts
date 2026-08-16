import { DEFAULT_CITY } from '../const/const';
import { TOffer } from '../const/types';
import { createReducer } from '@reduxjs/toolkit';
import { cityChangeAction, fillOffersAction, setOffersLoadingStatusAction } from './action';

type TInitialState = {
  city: string;
  offers: TOffer[];
  isOffersLoading: boolean;
};

const initialState: TInitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChangeAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatusAction, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});
