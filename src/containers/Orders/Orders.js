import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.token);
  }

  render () {
    let orders = this.props.orders.map(order => {
      return <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price} />;
    });

    if (this.props.loading) {
      orders = <Spinner />;
    }

    return orders;
  }
}

const mapPropsToState = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};

export default connect(mapPropsToState, mapDispatchToProps)
(withErrorHandler(Orders, axios));
