import React from 'react';
import PropTypes from 'prop-types';

import styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {

  const cancelHandler = () => {

  };

  const continueHandler = () => {

  };

  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType="Danger" clicked={cancelHandler}>CANCEL</Button>
      <Button buttonType="Success" clicked={continueHandler}>CONTINUE</Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default CheckoutSummary;
