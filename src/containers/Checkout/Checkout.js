import React, { Component, Fragment } from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';

class Checkout extends Component {

  componentDidMount() {
    this.props.onInitPurchase();
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
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route path={this.getContactDataPath()} component={ContactData} />
        </Fragment>
      )
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

