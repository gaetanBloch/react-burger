import React from 'react';
import PropTypes from 'prop-types';

import styles from './Order.module.css'

const Order = (props) => {
    const ingredients = [];
    Object.keys(props.ingredients).forEach(ingredientName => {
      ingredients.push({
        name: ingredientName === 'alad' ? 'salad' : ingredientName,
        amount: props.ingredients[ingredientName]
      });
    });

    const ingredientOutput = ingredients.map(ingredient => {
      return <span
        key={ingredient.name}
        className={styles.Ingredient}>
        {ingredient.name} ({ingredient.amount})
      </span>
    })

    return (
      <div className={styles.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
      </div>
    )
  }
;

Order.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
}

export default Order;
