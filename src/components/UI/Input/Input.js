import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css'

const Input = (props) => {
  let inputElement;
  switch (props.elementType) {
    case 'input':
      inputElement = <input
        id={props.id}
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value} />
      break;
    case 'textarea':
      inputElement = <textarea
        id={props.id}
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value} />
      break;
    case 'select':
      inputElement = (
        <select
          id={props.id}
          className={styles.InputElement}
          value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input
        id={props.id}
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value} />
  }

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  elementType: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
}

export default Input;
