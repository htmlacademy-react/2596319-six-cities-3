import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const/const';
import { PrivateRoute } from '../private-route/private-route';
import { PublicRoute } from '../public-route/public-route';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, checkAuthorizationStatusAction, State } from '../../store/api-actions';
import { useEffect } from 'react';

export default function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthorizationStatusAction());
  }, [dispatch]);

  const authorizationStatus = useSelector((state: State) => state.user.authorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={
          <MainPage
            authorizationStatus={authorizationStatus}
          />
        }
        />
        <Route path={AppRoute.Login} element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute >
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<OfferPage authorizationStatus={authorizationStatus}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
