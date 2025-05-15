import { Preloader } from '@ui';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIsUserAuth, getUserStatus } from '../../services/user/userSlice';

interface Props {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
}

function ProtectedRoute({ children, onlyUnAuth = false }: Props) {
  const { isUserLoading } = useSelector(getUserStatus);
  const isAuth = useSelector(getIsUserAuth);
  const location = useLocation();

  if (isUserLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate to={from} replace />;
  }

  return children;
}

export default ProtectedRoute;
