import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import LoginForm from '../../components/login-form/login-form';
import { CITIES, AppRoute } from '../../const/const';
import { getRandomInteger } from '../../utils/utils';
import { AppDispatch } from '../../store/api-actions';
import { setCity } from '../../store/slices/offers-slice';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const randomCity = useMemo(() => CITIES[getRandomInteger(0, CITIES.length - 1)], []);

  const handleRandomCityClick = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(setCity(randomCity));
      navigate(AppRoute.Main);
    },
    [dispatch, navigate, randomCity]
  );

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="/"
                onClick={handleRandomCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
