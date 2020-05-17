import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyCv1I87seMOrUkt2qmRkdRrnd6a4_u_4mA';

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
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

const doAuth = async (dispatch, email, password) => {
  const payload = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  try {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      API_KEY,
      payload
    );
    console.log(response);
    dispatch(authSuccess(response.data));
  } catch (error) {
    console.log(error.response.data.error.message);
    dispatch(authFail(error));
  }
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    doAuth(dispatch, email, password);
  };
};
