import React from 'react';
import PropTypes from 'prop-types';

import styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tasted well!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType="Danger" clicked={}>CANCEL</Button>
      <Button buttonType="Success" clicked={}>CONTINUE</Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.array.isRequired
}

export default CheckoutSummary;
