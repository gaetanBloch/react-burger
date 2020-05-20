import * as actionTypes from './actionTypes';

export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: type
  };
};

export const removeIngredient = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: type
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  };
};

export const fetchIngredientSuccess = (ingredients) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  };
};
