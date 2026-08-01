import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type PublicRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export function PublicRoute({authorizationStatus, children}: PublicRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth ? <Navigate to='/' /> : children;
}
