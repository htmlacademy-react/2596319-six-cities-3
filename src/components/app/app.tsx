import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { TOffer } from '../../mocks/offers';

type AppProps = {
  authorizationStatus: AuthorizationStatus;
  offers: TOffer[];
}

export default function App({authorizationStatus, offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainPage
            authorizationStatus={authorizationStatus}
            offers={offers}
          />
        }
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={authorizationStatus}><FavoritesPage offers={offers}/></PrivateRoute> } />
        <Route path={AppRoute.Offer} element={<OfferPage authorizationStatus={authorizationStatus} offers={offers}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
