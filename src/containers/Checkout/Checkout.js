import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {}
  }

  componentDidMount() {
    if (this.props.location.search) {
      const queryParams = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      for (const param of queryParams.entries()) {
        ingredients[param[0]] = +param[1];
      }
      this.setState({ingredients: ingredients});
    }
  }

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
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route path={this.getContactDataPath()} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;

