import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  }

  componentDidMount() {
    if (this.props.location.search) {
      // Parse query parameters
      const queryParams = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      let price = 0;
      for (const param of queryParams.entries()) {
        if (param[0] !== 'price') {
          ingredients[param[0]] = +param[1];
        } else {
          price = param[1];
        }
      }
      this.setState({ingredients: ingredients, totalPrice: price});
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
        <Route
          path={this.getContactDataPath()}
          render={() => <ContactData
            ingredients={this.state.ingredients}
            price={this.state.totalPrice} />
          } />
      </div>
    );
  }
}

export default Checkout;

