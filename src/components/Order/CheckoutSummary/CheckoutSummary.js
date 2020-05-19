import React from 'react';
import PropTypes from 'prop-types';

import styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <p><strong>Total price: ${props.totalPrice.toFixed(2)}</strong></p>
      <Button buttonType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button buttonType="Success" clicked={props.checkoutContinued}>CHECKOUT</Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired
}

export default CheckoutSummary;
