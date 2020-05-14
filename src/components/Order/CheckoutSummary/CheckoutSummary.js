import React from 'react';
import PropTypes from 'prop-types';

import styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tasted well!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.array.isRequired
}

export default CheckoutSummary;
