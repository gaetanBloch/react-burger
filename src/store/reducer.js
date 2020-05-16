import * as ActionTypes from './actions'

const initialState = {
  ingredients: {
    alad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 2
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        }
      }
    case ActionTypes.REMOVE_INGREDIENT:
      const oldCount = state.ingredients[action.ingredientType]
      if (oldCount > 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientType]: oldCount - 1
          }
        };
      }
      return state;
    default:
      return state;
  }
}

export default reducer;
