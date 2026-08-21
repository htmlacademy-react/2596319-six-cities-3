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
  CityChange = 'CITY_CHANGE',
  FillOffers = 'FILL_OFFERS',
  SetOffersLoadingStatus = 'SET_OFFERS_LOADING_STATUS',
  ChangeAuthorizationStatus = 'CHANGE_AUTHORIZATION_STATUS',
  FillUserData = 'FILL_USER_DATA'
}

export enum APIActions {
  FetchOffers = 'FETCH_OFFERS',
  FetchSingleOffer = 'FETCH_SINGLE_OFFER',
  FetchOffersNearby = 'FETCH_OFFERS_NEARBY',
  FetchFavoritedOffers = 'FETCH_FAVORITED_OFFERS',
  ChangeFavoritedStatus = 'CHANGE_FAVORITED_STATUS',
  FetchComments = 'FETCH_COMMENTS',
  PostNewComment = 'POST_NEW_COMMENT',
  CheckAuthorizationStatus = 'CHECK_AUTHORIZATION_STATUS',
  Login = 'LOGIN'
}

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/{offerId}',
  OffersNearby = '/offers/{offerId}/nearby',
  FavoritedOffers = '/favorite',
  ChangeFavoritedStatus = '/favorite/{offerId}/{status}',
  Comments = '/comments/{offerId}',
  Login = '/login'
}

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const URL_MARKER_DEFAULT = '../img/pin.svg';
export const URL_MARKER_CURRENT = '../img/pin-active.svg';

export const DEFAULT_CITY = 'Paris';
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const API_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const AUTH_TOKEN_NAME = 'six-cities-token';
