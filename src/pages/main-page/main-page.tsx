import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import Hotels from '../../components/hotels/hotels';
import HotelsMap from '../../components/hotels-map/hotels-map';
import { AuthorizationStatus, Settings } from '../../const';

type MainPageProps = {
  authorizationStatus: AuthorizationStatus;
}

export default function MainPage({authorizationStatus}: MainPageProps): JSX.Element {
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
        <CitiesTabs />
        <div className="cities">
          <div className="cities__places-container container">
            <Hotels cardsCount={Settings.CardsCount}/>
            <HotelsMap />
          </div>
        </div>
      </main>
    </div>
  );
}
