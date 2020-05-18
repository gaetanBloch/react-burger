import * as actionTypes from './actionTypes';
import axios from 'axios';

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyCv1I87seMOrUkt2qmRkdRrnd6a4_u_4mA';
const STORAGE_KEY = 'burger-user';

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const checkAuthTimeout = (expirationTime) => {
  console.log(`Session token expires in ${expirationTime / 1000} seconds`);
  return dispatch => {
    setTimeout(() => {
      dispatch(signOut());
    }, expirationTime);
  };
};

const doAuth = async (dispatch, email, password, urlComplement) => {
  const payload = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  try {
    const response = await axios.post(
      `${BASE_URL}${urlComplement}?key=${API_KEY}`,
      payload
    );
    const expiresInMillis = +response.data.expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresInMillis);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      token: response.data.idToken,
      userId: response.data.localId,
      expirationDate: expirationDate
    }));
    dispatch(authSuccess(response.data.idToken, response.data.localId));
    dispatch(checkAuthTimeout(expiresInMillis));
  } catch (error) {
    dispatch(authFail(error));
  }
};

const dispatchAuth = (email, password, urlComplement) => {
  return dispatch => {
    dispatch(authStart());
    doAuth(dispatch, email, password, urlComplement);
  };
};

export const signIn = (email, password) => {
  return dispatchAuth(email, password, 'signInWithPassword');
};

export const signUp = (email, password) => {
  return dispatchAuth(email, password, 'signUp');
};

export const signOut = () => {
  localStorage.removeItem(STORAGE_KEY);
  return {
    type: actionTypes.AUTH_SIGN_OUT
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const userData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!userData) {
      dispatch(signOut());
    } else {
      const expirationDate = new Date(userData.expirationDate);
      if (expirationDate > new Date()) {
        dispatch(authSuccess(userData.token, userData.userId));
        dispatch(checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime()
        ));
      } else {
        dispatch(signOut());
      }
    }
  };
};
