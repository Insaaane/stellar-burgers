import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getAllOrders, getOrderById } from './ordersThunk';
import { TResponseError } from '../util';

export interface IFeedState {
  orders: TOrder[];
  totalFeeds: number;
  totalFeedsToday: number;
  currentOrder: TOrder | null;
  status: {
    isLoading: boolean;
    error: TResponseError | null;
  };
}

const initialState: IFeedState = {
  orders: [],
  totalFeeds: 0,
  totalFeedsToday: 0,
  currentOrder: null,
  status: {
    isLoading: false,
    error: null
  }
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL ORDERS
      .addCase(getAllOrders.pending, (state) => {
        state.status.isLoading = true;
        state.status.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalFeeds = action.payload.total;
        state.totalFeedsToday = action.payload.totalToday;

        state.status.isLoading = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.error = action.error as TResponseError;
      })

      // GET ORDER BY ID
      .addCase(getOrderById.pending, (state) => {
        state.status.isLoading = true;
        state.status.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
        state.status.isLoading = false;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.error = action.error as TResponseError;
      });
  },
  selectors: {
    getOrdersFeed: (state) => state.orders,
    getTotalFeeds: (state) => state.totalFeeds,
    getTotalFeedsToday: (state) => state.totalFeedsToday,
    getCurrentOrder: (state) => state.currentOrder
  }
});

export const ordersReducer = ordersSlice.reducer;
export const {
  getOrdersFeed,
  getTotalFeeds,
  getTotalFeedsToday,
  getCurrentOrder
} = ordersSlice.selectors;
