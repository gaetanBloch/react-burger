import * as actionsTypes from '../actions/actionTypes'

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionsTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionsTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({...action.orderData, id: action.orderId}),
        purchased: true
      }
    case actionsTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default reducer;
