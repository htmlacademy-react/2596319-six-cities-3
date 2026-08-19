import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const/const';
import { TOffer } from '../../const/types';
import { fetchOffersAction } from '../api-actions';

type OffersState = {
  city: string;
  offers: TOffer[];
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
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
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      });
  },
});

export const { setCity } = offersSlice.actions;
