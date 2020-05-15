import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders'

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  initializeFormElement = (placeholder,
                           valueType,
                           validationRules = null,
                           type = 'text') => {
    return {
      elementType: 'input',
      elementConfig: {
        type: type,
        placeholder: placeholder
      },
      valueType: valueType,
      value: '',
      validation: {
        required: true,
        ...validationRules
      },
      valid: false,
      touched: false
    };
  };

  state = {
    orderForm: {
      name: this.initializeFormElement('Your Name', 'name'),
      email: this.initializeFormElement('Your E-Mail', 'e-mail address', null, 'email'),
      street: this.initializeFormElement('Street', 'street name'),
      zipCode: this.initializeFormElement('ZIP Code', 'ZIP code', {minLength: 5, maxLength: 5}),
      country: this.initializeFormElement('Country', 'country name'),
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
    loading: false,
    formIsValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value != null && value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value != null && value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value != null && value.length <= rules.maxLength && isValid;
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
