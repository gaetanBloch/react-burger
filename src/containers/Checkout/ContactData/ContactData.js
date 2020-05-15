import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders'

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  initializeFormElement = (placeholder, validationRules = null, type = 'text') => {
    return {
      elementType: 'input',
      elementConfig: {
        type: type,
        placeholder: placeholder
      },
      value: '',
      validation: {
        required: true,
        ...validationRules
      },
      valid: false
    };
  };

  state = {
    orderForm: {
      name: this.initializeFormElement('Your Name'),
      email: this.initializeFormElement('Your E-Mail', null, 'email'),
      street: this.initializeFormElement('Street'),
      zipCode: this.initializeFormElement('ZIP Code', {minLength: 5, maxLength: 5}),
      country: this.initializeFormElement('Country'),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'fastest'
      },
    },
    loading: false
  };

  checkValidity(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value !== null && value !== undefined && value.trim() !== '';
    }
    if (rules.minLength) {
      isValid = value >= rules.minLength;
    }
    if (rules.maxLength) {
      isValid = value <= rules.maxLength;
    }
    return isValid;
  }

  orderHandler = async (event) => {
    event.preventDefault();

    this.setState({loading: true});

    const formData = {}
    Object.keys(this.state.orderForm).forEach(formElementKey => {
      formData[formElementKey] = this.state.orderForm[formElementKey].value;
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }

    try {
      await axios.post('/orders.json', order);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
      this.props.history.push('/');
    }
  };

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputId]}
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid =
      this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    console.log(updatedFormElement);
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
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
            changed={(event) => this.inputChangedHandler(event, input.id)} />
        ))}
        <Button buttonType="Success">ORDER</Button>
      </form>
    );

    if (this.state.loading) {
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

ContactData.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
}

export default ContactData;
