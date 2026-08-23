import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import { AuthorizationStatus } from '../../const/const';
import { TUserData } from '../../const/types';
import FavoritedHotels from '../../components/favorited-hotels/favorited-hotels';
import { useSelector } from 'react-redux';
import { State } from '../../store/api-actions';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const userData: TUserData | null = useSelector((state: State) => state.user.userData);
  const favoritedOffers = useSelector((state: State) => state.offers.favoritedOffers);

  if (favoritedOffers.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <UserInfo authorizationStatus={AuthorizationStatus.Auth} userData={userData} favoritesCount={favoritedOffers.length}/>
            </div>
          </div>
        </header>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to='/'>
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserInfo authorizationStatus={AuthorizationStatus.Auth} userData={userData} favoritesCount={favoritedOffers.length}/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritedHotels offers={favoritedOffers}/>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to='/'>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}
