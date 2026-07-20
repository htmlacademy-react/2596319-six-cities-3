import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import { AuthorizationStatus } from '../../const';
import { TOffer } from '../../mocks/offers';
import FavoritedHotels from '../../components/favorited-hotels/favorited-hotels';

type TFavoritePageProps = {
  offers: TOffer[];
}

export default function FavoritesPage({offers}: TFavoritePageProps) {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserInfo authorizationStatus={AuthorizationStatus.Auth} userEmail='Oliver.conner@gmail.com' favoriteCount={3}/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavoritedHotels offers={offers}/>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}
