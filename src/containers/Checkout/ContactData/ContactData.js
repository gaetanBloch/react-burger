import React, { useState } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { handleChangedForm, initializeFormElement } from '../../formUtils';
import { Redirect } from 'react-router';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: initializeFormElement(
      'Your Name*',
      'name',
      'name',
      null,
      'ex: Gaëtan Bloch'
    ),
    email: initializeFormElement(
      'Your E-Mail*',
      'email',
      'e-mail address',
      { isEmail: true },
      'ex: gaetan.bloch@gmail.com'
    ),
    street: initializeFormElement(
      'Street*',
      'street',
      'street name',
      null,
      'ex: 66 Nantes Street'
    ),
    zipCode: initializeFormElement(
      'ZIP Code*',
      'zipcode',
      'ZIP code',
      { minLength: 5, maxLength: 5, isNumeric: true },
      'ex: 44300'
    ),
    country: initializeFormElement(
      'Country*',
      'country',
      'country name',
      null,
      'ex: France'
    ),
    deliveryMethod: {
      elementType: 'select',
      label: 'Delivery method*',
      id: 'delivery',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = async (event) => {
    // Prevent submission of the form
    event.preventDefault();

    const formData = {};
    Object.keys(orderForm).forEach(formElementKey => {
      formData[formElementKey] = orderForm[formElementKey].value;
    });

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputId) => {
    handleChangedForm(event, inputId, orderForm, setOrderForm, setFormIsValid);
  };

  const inputs = [];
  Object.keys(orderForm).forEach(key => {
    inputs.push({
      id: key,
      config: orderForm[key]
    });
  });

  let form = (
    <form onSubmit={orderHandler}>
      {inputs.map(input => (
        <Input
          key={input.id}
          label={input.config.label}
          id={input.config.id}
          elementType={input.config.elementType}
          elementConfig={input.config.elementConfig}
          value={input.config.value}
          invalid={!input.config.valid}
          shouldValidate={input.config.validation}
          touched={input.config.touched}
          valueType={input.config.valueType}
          changed={(event) => inputChangedHandler(event, input.id)} />
      ))}
      <Button buttonType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

  return (
    <div className={styles.ContactData}>
      {purchasedRedirect}
      <h3>Enter your Contact Data</h3>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    purchased: state.order.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order, token) =>
      dispatch(actions.purchaseBurgerInit(order, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios));
