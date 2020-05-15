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
        value={props.value}
        onChange={props.changed} />
      break;
    case 'textarea':
      inputElement = <textarea
        id={props.id}
        className={styles.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
    case 'select':
      inputElement = (
        <select
          id={props.id}
          className={styles.InputElement}
          value={props.value}
          onChange={props.changed}>
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
        value={props.value}
        onChange={props.changed} />
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
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired
}

export default Input;
