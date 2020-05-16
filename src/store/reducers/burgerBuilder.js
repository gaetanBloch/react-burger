import * as ActionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
  alad: 0.5,
  bacon: 1,
  cheese: 1,
  meat: 2
}

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      }
    case ActionTypes.REMOVE_INGREDIENT:
      const oldCount = state.ingredients[action.ingredientType]
      if (oldCount > 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientType]: oldCount - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
        };
      }
      return state;
    default:
      return state;
  }
}

export default burgerBuilder;
