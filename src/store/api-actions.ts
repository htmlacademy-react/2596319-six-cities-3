import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TOffer, TOfferExpanded, TReview } from '../const/types';
import { APIActions, APIRoute } from '../const/const';
import { store } from './store';
import { fillOffersAction, setOffersLoadingStatusAction } from './action';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, ThunkConfig>(
  APIActions.FetchOffers,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatusAction(true));
    const { data } = await api.get<TOffer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatusAction(false));
    dispatch(fillOffersAction(data));
  }
);

export const fetchSingleOfferAction = createAsyncThunk<TOfferExpanded, string, ThunkConfig>(
  APIActions.FetchSingleOffer,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOfferExpanded>(
      APIRoute.Offer.replace('{offerId}', offerId)
    );
    return data;
  }
);
export const fetchOffersNearbyAction = createAsyncThunk<TOffer[], string, ThunkConfig>(
  APIActions.FetchOffersNearby,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(
      APIRoute.OffersNearby.replace('{offerId}', offerId)
    );
    return data;
  }
);

export const fetchFavoritedOffersAction = createAsyncThunk<TOffer[], undefined, ThunkConfig>(
  APIActions.FetchFavoritedOffers,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(APIRoute.FavoritedOffers);
    return data;
  }
);

export const changeFavoritedStatusAction = createAsyncThunk<
  TOffer,
  { offerId: string; status: number },
  ThunkConfig
>(
  APIActions.ChangeFavoritedStatus,
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<TOffer>(
      APIRoute.ChangeFavoritedStatus
        .replace('{offerId}', offerId)
        .replace('{status}', String(status))
    );
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<TReview[], string, ThunkConfig>(
  APIActions.FetchComments,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TReview[]>(
      APIRoute.Comments.replace('{offerId}', offerId)
    );
    return data;
  }
);
