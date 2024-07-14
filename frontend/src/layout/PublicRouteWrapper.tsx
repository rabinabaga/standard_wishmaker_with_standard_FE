import { Outlet, Navigate } from 'react-router-dom';
import { PATH } from '../constants/path';

interface PublicRouteWrapperProps {
  isLoggedIn: boolean;
}

const PublicRouteWrapper: React.FC<PublicRouteWrapperProps> = ({
  isLoggedIn,
}) => {
  return !isLoggedIn ? <Outlet /> : <Navigate to={PATH.dashboard} />;
};

export default PublicRouteWrapper;
