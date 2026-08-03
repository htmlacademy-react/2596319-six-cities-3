import { Actions } from '../const';
import { createAction } from '@reduxjs/toolkit';

export const cityChangeAction = createAction<string>(Actions.CityChange);
export const fillOffersInCityAction = createAction<string>(Actions.FillOffersInCity);
