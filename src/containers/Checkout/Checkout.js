import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import CheckoutSummary
  from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace(getContactDataPath());
  };

  const getContactDataPath = () => {
    return props.match.url + '/contact-data';
  };

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    summary = (
      <CheckoutSummary
        ingredients={props.ingredients}
        totalPrice={props.totalPrice}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler} />
    );
  }

  return summary;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);

