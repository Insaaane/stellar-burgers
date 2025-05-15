import { getFeedsApi, getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createNewOrder = createAsyncThunk(
  'newOrder/createNewOrder',
  async function (data: string[], { rejectWithValue }) {
    try {
      const response = await orderBurgerApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
