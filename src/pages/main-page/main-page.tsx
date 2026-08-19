import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Hotels from '../../components/hotels/hotels';
import HotelsMap from '../../components/hotels-map/hotels-map';
import { AuthorizationStatus } from '../../const/const';
import { TOffer } from '../../const/types';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../../store/store';
import { setCity } from '../../store/slices/offers-slice';
import { State } from '../../store/api-actions';

type RootState = ReturnType<typeof store.getState>;

type MainPageProps = {
  authorizationStatus: AuthorizationStatus;
};

export default function MainPage({ authorizationStatus }: MainPageProps): JSX.Element {
  const dispatch = useDispatch();
  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);

  const activeCity = useSelector((state: RootState) => state.offers.city);
  const allOffers = useSelector((state: RootState) => state.offers.offers);
  const offersInCity = allOffers.filter((offer) => offer.city.name.toLowerCase() === activeCity.toLowerCase());
  const userData = useSelector((state: State) => state.user.userData);

  const handleCityChange = useCallback((city: string) => {
    dispatch(setCity(city));
  }, [dispatch]);

  const handleHover = useCallback((offer?: TOffer) => {
    setActiveOffer(offer || null);
  }, []);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserInfo authorizationStatus={authorizationStatus} userData={userData}/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <CitiesTabs activeCity={activeCity} onCityClick={handleCityChange}/>
        <div className="cities">
          <div className="cities__places-container container">
            <Hotels offers={offersInCity} handleHover={handleHover} activeCity={activeCity}/>
            <div className="cities__right-section">
              <HotelsMap offers={offersInCity} selectedOffer={activeOffer}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
