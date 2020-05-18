import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../storeUtils';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const getErrorMessage = (error) => {
  const defaultErrorMessage = 'An Unknown error occurred!';

  if (!error.response || !error.response.data || !error.response.data.error) {
    return defaultErrorMessage;
  }
  switch (error.response.data.error.message) {
    case 'MISSING_PASSWORD':
      return 'No password were provided.';
    case 'WEAK_PASSWORD':
      return 'The password must be 6 characters long or more.';
    case 'EMAIL_EXISTS' :
      return 'The email address is already in use by another account.';
    case 'OPERATION_NOT_ALLOWED':
      return 'Password sign-in is disabled for this project.';
    case 'TOO_MANY_ATTEMPTS_TRY_LATER' :
      return 'We have blocked all requests from this device due to unusual' +
        ' activity. Try again later.';
    case 'EMAIL_NOT_FOUND' :
      return 'There is no user record corresponding to this identifier.' +
        ' The user may have been deleted.';
    case 'INVALID_PASSWORD':
      return 'The password is invalid or the user does not have a password.';
    case 'USER_DISABLED' :
      return 'The user account has been disabled by an administrator.';
    default:
      return defaultErrorMessage;
  }
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: getErrorMessage(action.error),
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default reducer;

