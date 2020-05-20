import { STORAGE_KEY } from '../storeUtils';
import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

function* signOut(action) {
  yield localStorage.removeItem(STORAGE_KEY);
  yield put({
    type: actionTypes.AUTH_SIGN_OUT
  })
}
