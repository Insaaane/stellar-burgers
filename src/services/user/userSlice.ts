import { createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getUser,
  getUserOrders,
  login,
  logout,
  register,
  updateUser
} from './userThunk';
import { TResponseError } from '../util';

interface IUserState {
  isAuth: boolean;
  userData: TUser | null;
  orders: TOrder[];
  status: {
    isUserLoading: boolean;
    isOrdersLoading: boolean;
    error: TResponseError | null;
  };
}

const initialState: IUserState = {
  isAuth: false,
  userData: null,
  orders: [],
  status: {
    isUserLoading: false,
    isOrdersLoading: false,
    error: null
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.status.isUserLoading = true;
        state.status.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status.isUserLoading = false;
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status.isUserLoading = false;
        state.status.error = action.payload as TResponseError;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.status.isUserLoading = true;
        state.status.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status.isUserLoading = false;
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status.isUserLoading = false;
        state.status.error = action.payload as TResponseError;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.status.isUserLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
        state.status.isUserLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status.isUserLoading = false;
      })

      // GET USER ORDERS
      .addCase(getUserOrders.pending, (state) => {
        state.status.isOrdersLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status.isOrdersLoading = false;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status.isOrdersLoading = false;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.status.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status.error = action.payload as TResponseError;
      })

      // LOGOUT

      .addCase(logout.pending, (state) => {
        state.status.isUserLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.status.isUserLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.status.isUserLoading = false;
      });
  },
  selectors: {
    getUserStatus: (state) => state.status,
    getUserData: (state) => state.userData,
    getIsUserAuth: (state) => state.isAuth,
    getUserOrdersData: (state) => state.orders
  }
});

export const userReducer = userSlice.reducer;
export const { getUserStatus, getIsUserAuth, getUserData, getUserOrdersData } =
  userSlice.selectors;
