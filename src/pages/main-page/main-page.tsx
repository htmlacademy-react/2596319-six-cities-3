import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Hotels from '../../components/hotels/hotels';
import HotelsMap from '../../components/hotels-map/hotels-map';
import { AuthorizationStatus } from '../../const/const';
import { TOffer } from '../../const/types';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../../store/store';
import { cityChangeAction } from '../../store/action';

type RootState = ReturnType<typeof store.getState>;

type MainPageProps = {
  authorizationStatus: AuthorizationStatus;
};

export default function MainPage({ authorizationStatus }: MainPageProps): JSX.Element {
  const dispatch = useDispatch();
  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);

  const activeCity = useSelector((state: RootState) => state.city);
  const allOffers = useSelector((state: RootState) => state.offers);
  const offersInCity = allOffers.filter((offer) => offer.city.name.toLowerCase() === activeCity.toLowerCase());

  function handleCityChange(city: string) {
    dispatch(cityChangeAction(city));
  }

  function handleHover(offer?: TOffer) {
    setActiveOffer(offer || null);
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserInfo authorizationStatus={authorizationStatus} userEmail='Oliver.conner@gmail.com' favoriteCount={3}/>
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
