import { memo } from 'react';
import { AuthorizationStatus, AppRoute } from '../../const/const';
import { Link } from 'react-router-dom';
import { TUserData } from '../../const/types';
import { useDispatch } from 'react-redux';
import { AppDispatch, logoutAction } from '../../store/api-actions';

type UserInfoProps = {
  authorizationStatus: AuthorizationStatus;
  userData: TUserData | null;
  favoritesCount: number;
};

function UserInfo(props: UserInfoProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { authorizationStatus, userData, favoritesCount } = props;

  function handleLogout(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    dispatch(logoutAction());
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              {userData?.email}
            </span>
            <span className="header__favorite-count">{favoritesCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link to={AppRoute.Login} className="header__nav-link" onClick={handleLogout}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const MemorizedUserInfo = memo(UserInfo);

export default MemorizedUserInfo;
