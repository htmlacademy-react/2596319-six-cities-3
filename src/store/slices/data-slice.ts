import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DataState = {
  isServerError: boolean;
};

const initialState: DataState = {
  isServerError: false,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setServerError: (state, action: PayloadAction<boolean>) => {
      state.isServerError = action.payload;
    },
  },
});

export const { setServerError } = dataSlice.actions;
