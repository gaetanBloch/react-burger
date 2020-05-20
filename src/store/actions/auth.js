import * as actionTypes from './actionTypes';
import { STORAGE_KEY } from '../storeUtils';

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  };
};

export const signIn = (email, password) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    urlComplement: 'signInWithPassword'
  };
};

export const signUp = (email, password) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    urlComplement: 'signUp'
  };
};

export const initiateSignOut = () => {
  return {
    type: actionTypes.AUTH_INITIATE_SIGN_OUT
  };
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

export const authCheckState = () => {
  return dispatch => {
    const userData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!userData) {
      dispatch(initiateSignOut());
    } else {
      const expirationDate = new Date(userData.expirationDate);
      if (expirationDate > new Date()) {
        dispatch(authSuccess(userData.token, userData.userId));
        dispatch(checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime()
        ));
      } else {
        dispatch(initiateSignOut());
      }
    }
  };
};
