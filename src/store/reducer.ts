import { DEFAULT_CITY } from '../const';
import { offers, TOffer } from '../mocks/offers';
import { createReducer } from '@reduxjs/toolkit';
import { cityChangeAction, fillOffersAction } from './action';

type TInitialState = {
  city: string;
  offers: TOffer[] | null;
}

const initialState: TInitialState = {
  city: DEFAULT_CITY,
  offers: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChangeAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersAction, (state) => {
      state.offers = offers;
    });
});
