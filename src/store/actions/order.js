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

/* ******** FETCH ORDERS ******* */

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  }
}

const getOrders = async (dispatch) => {
  try {
    const response = await axios.get('/orders.json');
    const fetchedOrders = [];
    Object.keys(response.data).forEach(key => {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    })
    dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    dispatch(fetchOrdersFail());
  }
}

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    getOrders(dispatch);
  }
}


