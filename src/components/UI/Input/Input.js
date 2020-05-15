import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css'

const Input = (props) => {
  let inputElement = null;
  switch (props.inputElement) {
    case 'input':
      inputElement = <input id={props.id} {...props} />
      break;
    case 'textarea':
      inputElement = <textarea id={props.id} {...props} />
      break;
    default:
      inputElement = <input id={props.id} {...props} />
  }

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inputElement: PropTypes.string
}

export default Input;
