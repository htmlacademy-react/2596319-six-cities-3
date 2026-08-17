import { AuthorizationStatus, DEFAULT_CITY } from '../const/const';
import { TOffer, TUserData } from '../const/types';
import { createReducer } from '@reduxjs/toolkit';
import { authorizationStatusChangeAction, cityChangeAction, fillOffersAction, fillUserDataAction, setOffersLoadingStatusAction } from './action';

type TInitialState = {
  city: string;
  offers: TOffer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: TUserData | null;
};

const initialState: TInitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null
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
    })
    .addCase(authorizationStatusChangeAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(fillUserDataAction, (state, action) => {
      state.userData = action.payload;
    });
});
