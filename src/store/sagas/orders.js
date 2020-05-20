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
