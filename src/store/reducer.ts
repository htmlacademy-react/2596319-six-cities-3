import { DEFAULT_CITY } from '../const';
import { offers, TOffer } from '../mocks/offers';
import { createReducer } from '@reduxjs/toolkit';
import { cityChangeAction, fillOffersInCityAction } from './action';

type TInitialState = {
  city: string;
  offersInCity: TOffer[];
}

const initialState: TInitialState = {
  city: DEFAULT_CITY,
  offersInCity: offers.filter((offer) => offer.city.name === DEFAULT_CITY),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChangeAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersInCityAction, (state) => {
      state.offersInCity = offers.filter((offer) => offer.city.name === state.city);
    });
});
