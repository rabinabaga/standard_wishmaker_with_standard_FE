import { Outlet, Navigate } from 'react-router-dom';
import { PATH } from '../constants/path';

interface PublicRouteWrapperProps {
  isLoggedIn: boolean;
}

const PublicRouteWrapper: React.FC<PublicRouteWrapperProps> = ({
  isLoggedIn,
}) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="border shadow-authBox border-primary-faded border-[0.1px] flex flex-col py-[60px] px-[55px] gap-5">
        {!isLoggedIn ? <Outlet /> : <Navigate to={PATH.dashboard} />}

      </div>
    </div>)
};

export default PublicRouteWrapper;
