import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>
            {key}
          </span>: {props.ingredients[key]}
        </li>
      );
    });

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <div style={{textAlign: 'center'}}>
        <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout ?</p>
        <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
      </div>
    </Fragment>
  );
};

export default OrderSummary;
