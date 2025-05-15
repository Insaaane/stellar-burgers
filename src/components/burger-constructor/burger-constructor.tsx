import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorState,
  resetConstructor
} from '../../services/constructor/constructorSlice';
import {
  getOrderModalData,
  getOrderRequest,
  resetOrder
} from '../../services/newOrder/newOrderSlice';
import { useNavigate } from 'react-router-dom';
import { getIsUserAuth } from '../../services/user/userSlice';
import { createNewOrder } from '../../services/newOrder/newOrderThunk';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorState);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuth = useSelector(getIsUserAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createNewOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
