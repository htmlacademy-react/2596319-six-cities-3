import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const/const';
import { TUserData } from '../../const/types';
import { checkAuthorizationStatusAction, loginAction, logoutAction } from '../api-actions';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: TUserData | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus.Auth | AuthorizationStatus.NoAuth>) {
      state.authorizationStatus = action.payload;
    },
    setUserData(state, action: PayloadAction<TUserData>) {
      state.userData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorizationStatusAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload ?? null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload ?? null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(checkAuthorizationStatusAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  },
});

export const {setAuthorizationStatus, setUserData} = userSlice.actions;
