import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
  };

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postalCode" placeholder="Postal Code" />
          <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}

ContactData.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default ContactData;
