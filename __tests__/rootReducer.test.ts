import store from '../src/services/store';
import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../src/services/ingredients/IngredientsSlice';
import { burgerConstructorReducer } from '../src/services/constructor/constructorSlice';
import { userReducer } from '../src/services/user/userSlice';
import { ordersReducer } from '../src/services/orders/ordersSlice';
import { newOrderReducer } from '../src/services/newOrder/newOrderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  orders: ordersReducer,
  newOrder: newOrderReducer
});

describe('[rootReducer]', () => {
  it('должен возвращать начальное состояние при вызове с undefined-состоянием', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual(store.getState());
  });

  it('должен возвращать текущее состояние при неизвестном экшене', () => {
    const prevState = rootReducer(undefined, { type: '@@INIT' });
    const state = rootReducer(prevState, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(prevState);
  });
});
