import { configureStore } from '@reduxjs/toolkit';
import { server } from '../mocs/node';
import { ingredientsReducer } from '../src/services/ingredients/IngredientsSlice';
import { getIngredientsList } from '../src/services/ingredients/IngredientsThunk';
import ingredientsMock from '../cypress/fixtures/ingredients.json';

let store = configureStore({
  reducer: {
    ingredients: ingredientsReducer
  }
});

beforeAll(() => server.listen());
afterEach(() => {
  store = configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });
});
afterAll(() => server.close());

describe('[ingredientsSlice]', () => {
  it('pending выставляет isLoading=true', async () => {
    store.dispatch(getIngredientsList.pending('getIngredientsList'));
    const { status } = store.getState().ingredients;

    expect(status.isLoading).toBe(true);
  });

  it('успешная загрузка ингредиентов', async () => {
    store.dispatch(
      getIngredientsList.fulfilled(ingredientsMock.data, 'getIngredientsList')
    );
    const { status, ingredients } = store.getState().ingredients;

    expect(status.isLoading).toBe(false);
    expect(ingredients).toEqual(ingredientsMock.data);
    expect(status.error).toBeNull();
  });

  it('ошибка загрузки ингредиентов', async () => {
    const errorMock = 'Ошибка при получении ингредиентов';
    store.dispatch(
      getIngredientsList.rejected(new Error(errorMock), 'getIngredientsList')
    );
    const { status, ingredients } = store.getState().ingredients;

    expect(status.isLoading).toBe(false);
    expect(ingredients).toEqual([]);
    expect(status.error).not.toBeNull();
  });
});
