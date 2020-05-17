import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../storeUtils';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1,
  cheese: 1,
  meat: 2,
};

const INITIAL_BURGER_PRICE = 2;

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const oldCount = state.ingredients[action.ingredientType];
  if (oldCount > 0) {
    const updatedIngredient = {
      [action.ingredientType]: oldCount - 1,
    };
    const updatedIngredients = updateObject(state.ingredients,
      updatedIngredient);
    const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
    };
    return updateObject(state, updatedState);
  }
  return state;
};

const fetchIngredientSuccess = (state, action) => {
  const calculateInitialPrice = (ingredients) => {
    const totalPrice = Object.keys(ingredients)
      .map(key => ingredients[key] * INGREDIENT_PRICES[key])
      .reduce((sum, price) => sum + price);
    return INITIAL_BURGER_PRICE + totalPrice;
  };

  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: calculateInitialPrice(action.ingredients),
    error: false,
  });
};

const fetchIngredientsFail = (state, action) => {
  return updateObject(state, { error: true });
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_SUCCESS:
      return fetchIngredientSuccess(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return fetchIngredientsFail(state, action);
    default:
      return state;
  }
};

export default burgerBuilder;
