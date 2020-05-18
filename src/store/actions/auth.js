import * as actionTypes from './actionTypes';
import axios from 'axios';

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyCv1I87seMOrUkt2qmRkdRrnd6a4_u_4mA';
const STORAGE_KEY = 'burger-user';

const authSuccess = (responseData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: responseData.idToken,
    userId: responseData.localId
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
  console.log(`Token expires in ${expirationTime}ms`);
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
      user: {
        token: response.data.idToken,
        expiresIn: expirationDate
      }
    }));
    dispatch(authSuccess(response.data));
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
