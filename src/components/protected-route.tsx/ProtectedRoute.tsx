import { Preloader } from '@ui';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
}

function ProtectedRoute({ children, onlyUnAuth = false }: Props) {
  // const isAuthChecked = useSelector(isAuthCheckedSelector);
  // const user = useSelector(getUser);
  // const location = useLocation();

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  // if (!onlyUnAuth && !user) {
  //   return <Navigate replace to='/login' state={{ from: location }} />;
  // }

  // if (onlyUnAuth && user) {
  //   const from = location.state?.from || { pathname: '/' };

  //   return <Navigate replace to={from} />;
  // }

  return children;
}

export default ProtectedRoute;
