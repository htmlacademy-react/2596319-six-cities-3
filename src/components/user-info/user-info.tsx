import { memo } from 'react';
import { AuthorizationStatus } from '../../const/const';
import { Link } from 'react-router-dom';
import { TUserData } from '../../const/types';

type UserInfoProps = {
  authorizationStatus: AuthorizationStatus;
  userData: TUserData | null;
};

function UserInfo(props: UserInfoProps) {
  const { authorizationStatus, userData } = props;

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              {userData?.email}
            </span>
            <span className="header__favorite-count">3</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link to='/login' className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <Link to='/login' className="header__nav-link">
            <span className="header__signout">Log in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const MemorizedUserInfo = memo(UserInfo);

export default MemorizedUserInfo;
