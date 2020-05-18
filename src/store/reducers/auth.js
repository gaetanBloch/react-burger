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

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    default:
      return state;
  }
};

export default reducer;

