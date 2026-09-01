export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum Actions {
  CityChange = 'offers/cityChange',
  FillOffers = 'offers/fillOffers',
  SetOffersLoadingStatus = 'offers/setLoadingStatus',
  ChangeAuthorizationStatus = 'user/changeAuthStatus',
  FillUserData = 'user/fillData',
  setServerError = 'data/setServerError'
}

export enum APIActions {
  FetchOffers = 'offers/fetchOffers',
  FetchSingleOffer = 'offers/fetchSingleOffer',
  FetchOffersNearby = 'offers/fetchOffersNearby',
  FetchFavoritedOffers = 'offers/fetchFavoritedOffers',
  ChangeFavoritedStatus = 'favorites/changeStatus',
  FetchComments = 'comments/fetchComments',
  PostNewComment = 'comments/postComment',
  CheckAuthorizationStatus = 'user/authStatus',
  Login = 'user/login',
  Logout = 'user/logout'
}

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/{offerId}',
  OffersNearby = '/offers/{offerId}/nearby',
  FavoritedOffers = '/favorite',
  ChangeFavoritedStatus = '/favorite/{offerId}/{status}',
  Comments = '/comments/{offerId}',
  Login = '/login',
  Logout = '/logout'
}

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const URL_MARKER_DEFAULT = '../img/pin.svg';
export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const DEFAULT_CITY = 'Paris';
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const API_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const AUTH_TOKEN_NAME = 'six-cities-token';
export const MAX_REVIEWS_COUNT = 10;
