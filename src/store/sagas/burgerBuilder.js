import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get('/ingredients.json');
    yield put(actions.fetchIngredientSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFail());
  }
}
