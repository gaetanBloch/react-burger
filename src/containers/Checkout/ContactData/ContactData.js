import React, { Component } from 'react';
import axios from '../../../axios-orders'
import { connect } from 'react-redux';

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity, initializeFormElement } from './ContactDataUtils';

class ContactData extends Component {
  state = {
    orderForm: {
      name: initializeFormElement(
        'Your Name',
        'name'
      ),
      email: initializeFormElement(
        'Your E-Mail',
        'e-mail address',
        {isEmail: true},
        'email'
      ),
      street: initializeFormElement(
        'Street',
        'street name'
      ),
      zipCode: initializeFormElement(
        'ZIP Code',
        'ZIP code',
        {minLength: 5, maxLength: 5, isNumeric: true}
      ),
      country: initializeFormElement(
        'Country',
        'country name'
      ),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false
  };

  orderHandler = async (event) => {
    // Prevent submission of the form
    event.preventDefault();

    const formData = {}
    Object.keys(this.state.orderForm).forEach(formElementKey => {
      formData[formElementKey] = this.state.orderForm[formElementKey].value;
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    }

    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputId]}
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    // Check for all inputs validity
    let formIsValid = true
    Object.keys(updatedOrderForm).forEach(inputId => {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    });

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    const inputs = [];
    Object.keys(this.state.orderForm).forEach(key => {
      inputs.push({
        id: key,
        config: this.state.orderForm[key]
      })
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputs.map(input => (
          <Input
            key={input.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            invalid={!input.config.valid}
            shouldValidate={input.config.validation}
            touched={input.config.touched}
            valueType={input.config.valueType}
            changed={(event) => this.inputChangedHandler(event, input.id)} />
        ))}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
