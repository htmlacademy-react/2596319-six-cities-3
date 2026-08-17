import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const/const';
import { PrivateRoute } from '../private-route/private-route';
import { PublicRoute } from '../public-route/public-route';
import { Spinner } from '../spinner/spinner';
import { useSelector } from 'react-redux';
import { State } from '../../store/api-actions';

export default function App(): JSX.Element {
  const offers = useSelector((state: State) => state.offers);
  const isOffersLoading = useSelector((state: State) => state.isOffersLoading);
  const authorizationStatus = useSelector((state: State) => state.authorizationStatus);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainPage
            authorizationStatus={authorizationStatus}
          />
        }
        />
        <Route path={AppRoute.Login} element={<PublicRoute authorizationStatus={authorizationStatus}><LoginPage /></PublicRoute>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<OfferPage authorizationStatus={authorizationStatus}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
