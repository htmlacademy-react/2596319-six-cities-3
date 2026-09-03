import { memo } from 'react';
import { AppRoute } from '../../const/const';
import { Link } from 'react-router-dom';

type LogoProps = {
  isActive?: boolean;
}

function Logo({isActive = false}: LogoProps) {
  return (
    <Link className={`header__logo-link ${isActive && 'header__logo-link--active'}`} to={AppRoute.Main}>
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </Link>
  );
}

const MemoizedLogo = memo(Logo);
export default MemoizedLogo;
