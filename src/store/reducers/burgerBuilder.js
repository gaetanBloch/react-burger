import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
  alad: 0.5,
  bacon: 1,
  cheese: 1,
  meat: 2
}

const INITIAL_BURGER_PRICE = 2

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      }
    case actionTypes.REMOVE_INGREDIENT:
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
    case actionTypes.INIT_INGREDIENTS:

      const calculateInitialPrice = (ingredients) => {
        const totalPrice = Object.keys(ingredients)
          .map(key => ingredients[key] * INGREDIENT_PRICES[key])
          .reduce((sum, price) => sum + price);
        return INITIAL_BURGER_PRICE + totalPrice;
      }

      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: calculateInitialPrice(action.ingredients),
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
}

export default burgerBuilder;
