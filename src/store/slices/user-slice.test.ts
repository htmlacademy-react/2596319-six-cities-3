import { AuthorizationStatus } from '../../const/const';
import { checkAuthorizationStatusAction, loginAction, logoutAction } from '../api-actions';
import { userSlice } from './user-slice';

describe('userSlice test', () => {
  const mockUserData = {
    name: 'Oliver',
    avatarUrl: '',
    email: '',
    isPro: false,
    token: '',
  };

  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown, userData: null };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown, userData: null };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    const result = userSlice.reducer(
      initialState,
      checkAuthorizationStatusAction.fulfilled(mockUserData, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };

    const result = userSlice.reducer(
      initialState,
      checkAuthorizationStatusAction.rejected(null, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    const result = userSlice.reducer(
      initialState,
      loginAction.fulfilled(mockUserData, '', { email: '', password: '' })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, userData: null };

    const result = userSlice.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "logoutAction.fulfilled" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, userData: null };

    const result = userSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
