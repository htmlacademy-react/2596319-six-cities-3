import { Actions, AuthorizationStatus} from '../const/const';
import { createAction } from '@reduxjs/toolkit';
import { TOffer, TUserData } from '../const/types';

export const cityChangeAction = createAction<string>(Actions.CityChange);
export const fillOffersAction = createAction<TOffer[]>(Actions.FillOffers);
export const setOffersLoadingStatusAction = createAction<boolean>(Actions.SetOffersLoadingStatus);
export const authorizationStatusChangeAction = createAction<AuthorizationStatus>(Actions.ChangeAuthorizationStatus);
export const fillUserDataAction = createAction<TUserData>(Actions.FillUserData);
