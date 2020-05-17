import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: type
  }
}

export const removeIngredient = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: type
  }
}

/* ******** INIT INGREDIENTS ******* */

const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  }
}

const fetchIngredientSuccess = (ingredients) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
    ingredients: ingredients
  }
}

const getIngredients = async (dispatch) => {
  try {
    const response = await axios.get('/ingredients.json');
    dispatch(fetchIngredientSuccess(response.data));
  } catch (error) {
    dispatch(fetchIngredientsFail());
  }
}

export const initIngredients = () => {
  return dispatch => {
    getIngredients(dispatch);
  }
}
