import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../api';
import { offersSlice } from './slices/offers-slice';
import { userSlice } from './slices/user-slice';
import { dataSlice, setServerError } from './slices/data-slice';

const storeRef: { current?: typeof store } = {};

const api = createApi(() => {
  storeRef.current?.dispatch(setServerError(true));
});

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [dataSlice.name]: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api },
    }),
});

storeRef.current = store;
