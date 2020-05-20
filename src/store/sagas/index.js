import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  authCheckStateSaga,
  authUserSaga,
  checkAuthTimeoutSaga,
  signOutSaga
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { fetchOrdersInitSaga, purchaseBurgerInitSaga } from './orders';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_SIGN_OUT, signOutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerInitSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersInitSaga);
}
