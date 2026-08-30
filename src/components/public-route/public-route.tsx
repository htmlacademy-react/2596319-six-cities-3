import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const/const';
import { Spinner } from '../spinner/spinner';
import { useSelector } from 'react-redux';
import { State } from '../../store/api-actions';

type PublicRouteProps = {
  children: JSX.Element;
}

export function PublicRoute({children}: PublicRouteProps) {
  const authorizationStatus = useSelector((state: State) => state.user.authorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? <Navigate to='/' /> : children;
}
