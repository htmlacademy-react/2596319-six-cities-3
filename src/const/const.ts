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

export enum ReviewConfig {
  MinLength = 50,
  MaxLength = 300,
  MaxStarsWidthPercentage = 100,
  MaxStarsCount = 5,
  MaxReviewsCount = 10
}

export enum ServerConfig {
  ErrorCode = 500,
  MaxResponseTimeout = 5000
}

export enum MarkersConfig {
  Default = '../img/pin.svg',
  Active = '../img/pin-active.svg'
}

export enum CitiesConfig {
  DefaultCity = 'Paris'
}

export enum APIAction {
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

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const API_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const AUTH_TOKEN_NAME = 'six-cities-token';
