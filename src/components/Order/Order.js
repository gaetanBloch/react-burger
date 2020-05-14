import React from 'react';
import PropTypes from 'prop-types';

import styles from './Order.module.css'

const Order = (props) => (
  <div className={styles.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>Price: <strong>$6.50</strong></p>
  </div>
);

Order.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired
}

export default Order;
