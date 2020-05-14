import React, { Component } from 'react';

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

  render() {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postalCode" placeholder="Postal Code" />
          <Button buttonType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
