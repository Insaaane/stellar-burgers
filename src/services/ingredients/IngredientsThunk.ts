import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredientsList',
  async function (_, { rejectWithValue }) {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
