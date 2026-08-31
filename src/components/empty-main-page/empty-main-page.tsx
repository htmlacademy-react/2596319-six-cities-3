import { memo } from 'react';
import { AuthorizationStatus } from '../../const/const';
import { TUserData } from '../../const/types';
import CitiesTabs from '../cities-tabs/cities-tabs';
import MemoizedLogo from '../logo/logo';
import MemorizedUserInfo from '../user-info/user-info';

type TEmptyMainPageProps = {
  authorizationStatus: AuthorizationStatus;
  userData: TUserData | null;
  favoritesCount: number;
  activeCity: string;
  onCityClick: (city: string) => void;
}

function EmptyMainPage(
  {authorizationStatus, userData, favoritesCount, activeCity, onCityClick}: TEmptyMainPageProps
): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <MemoizedLogo />
            </div>
            <MemorizedUserInfo authorizationStatus={authorizationStatus} userData={userData} favoritesCount={favoritesCount}/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index page__main--index-empty">
        <CitiesTabs activeCity={activeCity} onCityClick={onCityClick}/>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in {activeCity}
                </p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}

const MemoizedEmptyMainPage = memo(EmptyMainPage);
export default MemoizedEmptyMainPage;
