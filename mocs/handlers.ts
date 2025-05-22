import { http, HttpResponse, Path } from 'msw';

import ingredients from '../cypress/fixtures/ingredients.json';
import feed from '../cypress/fixtures/feed.json';
import getOrder from '../cypress/fixtures/getOrder.json';
import user from '../cypress/fixtures/user.json';
import postOrder from '../cypress/fixtures/postOrderResponse.json';

const api = 'https://norma.nomoreparties.space/api';

export const ApiRoutes = {
  getIngredients: `${api}/ingredients`,
  getFeed: `${api}/orders/all`,
  getUser: `${api}/auth/user`,
  getOrder: `${api}/orders/*`,
  postOrder: `${api}/orders`,
  getUserOrders: `${api}/orders`,
  updateUserData: `${api}/auth/user`
};

export const handlers = [
  http.get(ApiRoutes.getIngredients, () => HttpResponse.json(ingredients)),
  http.get(ApiRoutes.getFeed, () => HttpResponse.json(feed)),
  http.get(ApiRoutes.getUser, () => HttpResponse.json(user)),
  http.get(ApiRoutes.getOrder, () => HttpResponse.json(getOrder)),
  http.get(ApiRoutes.postOrder, () => HttpResponse.json(postOrder)),
  http.get(ApiRoutes.getUserOrders, () =>
    HttpResponse.json({ orders: feed.orders, success: true })
  ),
  http.patch(ApiRoutes.updateUserData, () =>
    HttpResponse.json({ email: 'example@gmail.com', name: 'example' })
  )
];
