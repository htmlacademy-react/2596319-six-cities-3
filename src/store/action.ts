import { Actions } from '../const/const';
import { createAction } from '@reduxjs/toolkit';
import { TOffer } from '../const/types';

export const cityChangeAction = createAction<string>(Actions.CityChange);
export const fillOffersAction = createAction<TOffer[]>(Actions.FillOffers);
export const setOffersLoadingStatusAction = createAction<boolean>(Actions.SetOffersLoadingStatus);
