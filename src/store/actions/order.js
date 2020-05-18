import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/* ******** PURCHASE BURGER ******* */

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
  };
};

const postOrder = async (dispatch, order, token) => {
  try {
    const response = await axios.post(`/orders.json?auth=${token}`, order);
    dispatch(purchaseBurgerSuccess(response.data.name, order));
  } catch (error) {
    dispatch(purchaseBurgerFail());
  }
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    postOrder(dispatch, orderData, token);
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

/* ******** FETCH ORDERS ******* */

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  };
};

const getOrders = async (dispatch, token, userId) => {
  try {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    const response = await axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = [];
    Object.keys(response.data).forEach(key => {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    });
    dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    dispatch(fetchOrdersFail());
  }
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    getOrders(dispatch, token, userId);
  };
};


