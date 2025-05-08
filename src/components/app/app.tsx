import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

const Layout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ConstructorPage /> },
      { path: '/feed', element: <Feed /> },
      {
        path: '/feed/:number',
        element: (
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        )
      },
      {
        path: '/ingredients/:id',
        element: (
          <Modal title='' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        )
      },

      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/reset-password', element: <ResetPassword /> },

      { path: '/profile', element: <Profile /> },
      { path: '/profile/orders', element: <ProfileOrders /> },
      {
        path: '/profile/orders/:number',
        element: (
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        )
      },

      { path: '*', element: <NotFound404 /> }
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
