import * as actionTypes from './actionTypes';
import axios from 'axios';

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyCv1I87seMOrUkt2qmRkdRrnd6a4_u_4mA';

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
  return dispatch => {
    setTimeout(() => {
      dispatch(signOut());
    }, +expirationTime * 1000);
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
    dispatch(authSuccess(response.data));
    dispatch(checkAuthTimeout(response.timeout.expiresIn));
  } catch (error) {
    console.log(error.response.data.error.message);
    dispatch(authFail(error));
  }
};

const dispatchAuth = (email, password, urlComplement) => {
  return dispatch => {
    dispatch(authStart());
    doAuth(dispatch, email, password, urlComplement);
  };
};

export const signOut = () => {
  return {
    type: actionTypes.AUTH_SIGN_OUT
  };
};

export const signIn = (email, password) => {
  return dispatchAuth(email, password, 'signInWithPassword');
};

export const signUp = (email, password) => {
  return dispatchAuth(email, password, 'signUp');
};
