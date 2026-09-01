import { memo } from 'react';
import { AppRoute } from '../../const/const';

type LogoProps = {
  isActive?: boolean;
}

function Logo({isActive = false}: LogoProps) {
  return (
    <a className={`header__logo-link ${isActive && 'header__logo-link--active'}`} href={AppRoute.Main}>
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </a>
  );
}

const MemoizedLogo = memo(Logo);
export default MemoizedLogo;
