import { delay, put } from 'redux-saga/effects';

import { STORAGE_KEY } from '../storeUtils';
import * as actions from '../actions';
import axios from 'axios';

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyCv1I87seMOrUkt2qmRkdRrnd6a4_u_4mA';

export function* signOutSaga() {
  yield localStorage.removeItem(STORAGE_KEY);
  yield put(actions.signOut());
}

export function* checkAuthTimeoutSaga(action) {
  console.log(`Session expires in ${action.expirationTime / 1000} seconds`);
  yield delay(action.expirationTime);
  yield put(actions.initiateSignOut());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const payload = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  try {

    const response = yield axios.post(
      `${BASE_URL}${action.urlComplement}?key=${API_KEY}`,
      payload
    );
    const expiresInMillis = +response.data.expiresIn * 1000;
    const expirationDate = yield new Date(
      new Date().getTime() + expiresInMillis
    );

    yield localStorage.setItem(STORAGE_KEY, JSON.stringify({
      token: response.data.idToken,
      userId: response.data.localId,
      expirationDate
    }));

    yield put(actions.authSuccess(
      response.data.idToken,
      response.data.localId)
    );

    yield put(actions.checkAuthTimeout(expiresInMillis));

  } catch (error) {
    yield put(actions.authFail(error));
  }
}
