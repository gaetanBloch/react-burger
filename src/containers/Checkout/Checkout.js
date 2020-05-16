import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace(this.getContactDataPath());
  }

  getContactDataPath = () => {
    return this.props.match.url + '/contact-data';
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route path={this.getContactDataPath()} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);

