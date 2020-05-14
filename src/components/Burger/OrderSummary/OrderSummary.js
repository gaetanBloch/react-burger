import React from 'react';

import Aux from '../../../hoc/ReactAux/ReactAux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>
            {key === 'alad' ? 'salad' : key}
          </span>: {props.ingredients[key]}
        </li>
      );
    });

  return (
    <Aux>
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
    </Aux>
  );
};

export default OrderSummary;
