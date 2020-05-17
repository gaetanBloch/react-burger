import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

const postOrder = async (dispatch, orderData) => {
  try {
    const response = await axios.post('/orders.json', orderData);
    dispatch(purchaseBurgerSuccess(response.data, orderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
}

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    postOrder(dispatch, orderData);
  }
}
