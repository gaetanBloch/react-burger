import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};

const purchaseBurgerFail = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL
  }
}

const postOrder = async (dispatch, orderData) => {
  try {
    const response = await axios.post('/orders.json', orderData);
    dispatch(purchaseBurgerSuccess(response.data.name, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail());
  }
}

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    postOrder(dispatch, orderData);
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}


