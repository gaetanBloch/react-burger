import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';
import { initialState } from './auth';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('should store the token upon authentication', () => {
    const updatedStateProps = {
      token: 'some-token',
      userId: 'some-user-id'
    }
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      ...updatedStateProps
    })).toEqual({...initialState, ...updatedStateProps});
  })
});
