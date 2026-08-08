import { Actions } from '../const';
import { createAction } from '@reduxjs/toolkit';
import { TOffer } from '../mocks/offers';

export const cityChangeAction = createAction<string>(Actions.CityChange);
export const fillOffersAction = createAction<TOffer[]>(Actions.FillOffers);
