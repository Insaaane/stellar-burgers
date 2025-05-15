import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrdersData } from '../../services/user/userSlice';
import { getUserOrders } from '../../services/user/userThunk';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(getUserOrdersData);

  return <ProfileOrdersUI orders={orders} />;
};
