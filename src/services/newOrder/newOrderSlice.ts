import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TResponseError } from '../util';
import { createNewOrder } from './newOrderThunk';

export interface INewOrderState {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  status: {
    isLoading: boolean;
    error: TResponseError | null;
  };
}

const initialState: INewOrderState = {
  orderModalData: null,
  orderRequest: false,
  status: {
    isLoading: false,
    error: null
  }
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.status.isLoading = true;
        state.status.error = null;
        state.orderRequest = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.error = action.error as TResponseError;
      });
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});

export const newOrderReducer = newOrderSlice.reducer;
export const { getOrderModalData, getOrderRequest } = newOrderSlice.selectors;
export const { resetOrder } = newOrderSlice.actions;
