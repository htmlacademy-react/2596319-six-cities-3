import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TOffer, TOfferExpanded, TReview, TAuthData, TUserData, TCommentData } from '../const/types';
import { APIAction, APIRoute } from '../const/const';
import { store } from './store';
import { dropToken, saveToken } from '../token';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<TOffer[], undefined, ThunkConfig>(
  APIAction.FetchOffers,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchSingleOfferAction = createAsyncThunk<TOfferExpanded, string, ThunkConfig>(
  APIAction.FetchSingleOffer,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOfferExpanded>(
      APIRoute.Offer.replace('{offerId}', offerId)
    );
    return data;
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<TOffer[], string, ThunkConfig>(
  APIAction.FetchOffersNearby,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(
      APIRoute.OffersNearby.replace('{offerId}', offerId)
    );
    return data;
  }
);

export const fetchFavoritedOffersAction = createAsyncThunk<TOffer[], undefined, ThunkConfig>(
  APIAction.FetchFavoritedOffers,
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
  APIAction.ChangeFavoritedStatus,
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
  APIAction.FetchComments,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TReview[]>(
      APIRoute.Comments.replace('{offerId}', offerId)
    );
    return data;
  }
);

export const postCommentAction = createAsyncThunk<TReview, TCommentData, ThunkConfig>(
  APIAction.PostNewComment,
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<TReview>(
      APIRoute.Comments.replace('{offerId}', offerId),
      { comment, rating }
    );
    return data;
  }
);

export const checkAuthorizationStatusAction = createAsyncThunk<
  TUserData,
  undefined,
  ThunkConfig
>(
  APIAction.CheckAuthorizationStatus,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TUserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<
  TUserData,
  TAuthData,
  ThunkConfig
>(
  APIAction.Login,
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<TUserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  APIAction.Logout,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
