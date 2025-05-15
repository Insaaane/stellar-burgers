import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async function (_, { rejectWithValue }) {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async function (number: number, { rejectWithValue }) {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
