import * as actionsTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = state => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = state => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    purchased: true,
    loading: false,
  });
};

const purchaseBurgerFail = state => {
  return updateObject(state, { loading: false });
};

const fetchOrdersStart = state => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrderFail = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionsTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionsTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionsTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionsTypes.FETCH_ORDERS_START :
      return fetchOrdersStart(state);
    case actionsTypes.FETCH_ORDERS_SUCCESS :
      return fetchOrdersSuccess(state, action);
    case actionsTypes.FETCH_ORDERS_FAIL :
      return fetchOrderFail(state);
    default:
      return state;
  }
};

export default reducer;
