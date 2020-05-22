import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const Orders = props => {

  const { onFetchOrders, token, userId } = props;

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let orders = <h2 style={{ textAlign: 'center' }}>
    No past orders history to display.
  </h2>;

  if (props.orders.length > 0) {
    orders = props.orders.map(order => {
      return <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price} />;
    });
  }

  if (props.loading) {
    orders = <Spinner />;
  }

  return orders;
};

const mapPropsToState = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrdersInit(token, userId))
  };
};

export default connect(mapPropsToState, mapDispatchToProps)
(withErrorHandler(Orders, axios));
