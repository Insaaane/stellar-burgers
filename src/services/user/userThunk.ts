import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk(
  'user/register',
  async function (data: TRegisterData, { rejectWithValue }) {
    try {
      const response = await registerUserApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async function (data: TLoginData, { rejectWithValue }) {
    try {
      const response = await loginUserApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async function (_, { rejectWithValue }) {
    try {
      const response = await getUserApi();
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async function (data: Partial<TRegisterData>, { rejectWithValue }) {
    try {
      const response = await updateUserApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async function (_, { rejectWithValue }) {
    try {
      const response = await logoutApi();
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'user/getUserOrders',
  async function (_, { rejectWithValue }) {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
