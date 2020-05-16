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

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ingredients
  }
}

const getIngredients = async (dispatch) => {
  try {
    const response = await axios.get('/ingredients.json');
    dispatch(setIngredients(response.data));
  } catch (error) {
    dispatch(fetchIngredientsFailed());
  }
}

export const initIngredients = () => {
  return dispatch => {
    getIngredients(dispatch);
  }
}
