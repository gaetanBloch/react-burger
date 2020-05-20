import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  signOutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_SIGN_OUT, signOutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
