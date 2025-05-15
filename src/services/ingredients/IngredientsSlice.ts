import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsList } from './IngredientsThunk';
import { TResponseError } from '../util';

interface IIngredientState {
  ingredients: TIngredient[];
  status: {
    isLoading: boolean;
    error: TResponseError | null;
  };
}

const initialState: IIngredientState = {
  ingredients: [],
  status: {
    isLoading: false,
    error: null
  }
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.status.isLoading = true;
        state.status.error = null;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.error = action.payload as TResponseError;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsStatus: (state) => state.status
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredients, getIngredientsStatus } =
  ingredientsSlice.selectors;
