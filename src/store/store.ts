import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../api';
import { offersSlice } from './slices/offers-slice';
import { userSlice } from './slices/user-slice';

const api = createApi();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [userSlice.name]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}})
});
