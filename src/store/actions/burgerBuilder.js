import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

const INGREDIENT_PRICES = {
  alad: 0.5,
  bacon: 1,
  cheese: 1,
  meat: 2
}

const INITIAL_BURGER_PRICE = 2

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

const setIngredients = (ingredients, totalPrice) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ingredients,
    totalPrice: totalPrice
  }
}

const calculateInitialPrice = (ingredients) => {
  const totalPrice = Object.keys(ingredients)
    .map(key => ingredients[key] * INGREDIENT_PRICES[key])
    .reduce((sum, price) => sum + price);
  return INITIAL_BURGER_PRICE + totalPrice;
}

const getIngredients = async (dispatch) => {
  try {
    const response = await axios.get('/ingredients.json');
    dispatch(setIngredients(response.data, calculateInitialPrice(response.data)))
  } catch (error) {
    dispatch(fetchIngredientsFailed());
  }
}

export const initIngredients = () => {
  return dispatch => {
    getIngredients(dispatch);
  }
}
