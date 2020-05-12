import React from 'react';
import PropTypes from 'prop-types'

import styles from './Button.module.css'
import BurgerIngredient from '../../Burger/BurgerIngredient/BurgerIngredient';

const Button = (props) => (
  <button className={[styles.Button, styles[props.buttonType]].join(' ')} onClick={props.clicked}>
    {props.children}
  </button>
);

BurgerIngredient.propTypes = {
  buttonType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
}

export default Button;
