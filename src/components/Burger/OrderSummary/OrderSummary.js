import React from 'react';

import Aux from '../../../hoc/ReactAux';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return <li>
        <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
      </li>
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout ?</p>
    </Aux>
  );
};

export default OrderSummary;
