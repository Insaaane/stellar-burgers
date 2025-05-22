import {
  addItem,
  deleteItem,
  moveItemUp,
  moveItemDown,
  burgerConstructorReducer
} from '../src/services/constructor/constructorSlice';
import { TIngredient } from '../src/utils/types';
import ingredientsMock from '../cypress/fixtures/ingredients.json';

const initialState = {
  bun: null,
  ingredients: []
};

const bunMock: TIngredient = {
  ...ingredientsMock.data[0]
};

const ingredientMock: TIngredient = {
  ...ingredientsMock.data[1]
};

const ingredientMock2: TIngredient = {
  ...ingredientsMock.data[2]
};

describe('[constructorSlice]', () => {
  it('должен корректно обрабатывать добавление булки', () => {
    const state = burgerConstructorReducer(initialState, addItem(bunMock));
    expect(state.bun.name).toBe(bunMock.name);
  });

  it('должен корректно обрабатывать добавление ингредиента', () => {
    const state = burgerConstructorReducer(
      initialState,
      addItem(ingredientMock)
    );
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].name).toBe(ingredientMock.name);
  });

  it('должен корректно обрабатывать удаление ингредиента', () => {
    const stateWithIngredient = burgerConstructorReducer(
      initialState,
      addItem(ingredientMock)
    );
    const state = burgerConstructorReducer(
      stateWithIngredient,
      deleteItem({ id: stateWithIngredient.ingredients[0].id })
    );

    expect(state.ingredients.length).toBe(0);
  });

  it('должен корректно обрабатывать перемещение ингредиента вверх', () => {
    let state = burgerConstructorReducer(initialState, addItem(ingredientMock));
    state = burgerConstructorReducer(state, addItem(ingredientMock2));
    const id = state.ingredients[1].id;
    const movedState = burgerConstructorReducer(state, moveItemUp(id));

    expect(movedState.ingredients[0].name).toBe(ingredientMock2.name);
    expect(movedState.ingredients[1].name).toBe(ingredientMock.name);
  });

  it('должен корректно обрабатывать перемещение ингредиента вниз', () => {
    let state = burgerConstructorReducer(initialState, addItem(ingredientMock));
    state = burgerConstructorReducer(state, addItem(ingredientMock2));
    const id = state.ingredients[0].id;
    const movedState = burgerConstructorReducer(state, moveItemDown(id));

    expect(movedState.ingredients[0].name).toBe(ingredientMock2.name);
    expect(movedState.ingredients[1].name).toBe(ingredientMock.name);
  });
});
