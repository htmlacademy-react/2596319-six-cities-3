import { AuthorizationStatus } from '../../const/const';
import { Link } from 'react-router-dom';

type UserInfoProps = {
  authorizationStatus: AuthorizationStatus;
  userEmail?: string;
  favoriteCount?: number;
}

export default function UserInfo(props: UserInfoProps) {
  const { authorizationStatus, userEmail, favoriteCount } = props;
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              {userEmail}
            </span>
            <span className="header__favorite-count">{favoriteCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout">Log in</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
