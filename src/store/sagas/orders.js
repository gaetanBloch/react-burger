import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerInitSaga(action) {
  try {
    const response = yield axios.post(
      `/orders.json?auth=${action.token}`,
      action.order
    );
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.order));
  } catch (error) {
    yield put(actions.purchaseBurgerFail());
  }
}

export function* fetchOrdersInitSaga(action) {
  yield put(actions.fetchOrdersStart());
  try {
    const queryParams =
      `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    const response = yield axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = [];
    yield Object.keys(response.data).forEach(key => {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    });
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail());
  }
}
