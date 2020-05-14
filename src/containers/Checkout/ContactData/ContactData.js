import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders'

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = async (event) => {
    event.preventDefault();

    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Gaëtan Bloch',
        email: 'gaetan.bloch@gmail.com',
        address: {
          street: 'Nantes street',
          zipCode: '44300',
          country: 'France'
        }
      },
      deliveryMethod: 'fastest'
    }

    try {
      const response = await axios.post('/orders.json', order);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
      this.props.history.push('/');
    }
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="zipcode" placeholder="Zipcode" />
        <input type="text" name="country" placeholder="Country" />
        <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
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
