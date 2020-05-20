import { takeEvery, all, takeLatest } from 'redux-saga/effects';

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
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_SIGN_OUT, signOutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
  yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerInitSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersInitSaga);
}
