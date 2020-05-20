import { put, delay } from 'redux-saga/effects';

import { STORAGE_KEY } from '../storeUtils';
import * as actions from '../actions';

export function* signOutSaga() {
  yield localStorage.removeItem(STORAGE_KEY);
  yield put(actions.signOut());
}

export function* checkAuthTimeoutSaga(action) {
  console.log(`Session expires in ${action.expirationTime / 1000} seconds`);
  yield delay(action.expirationTime);
  yield put(actions.initiateSignOut())
}
