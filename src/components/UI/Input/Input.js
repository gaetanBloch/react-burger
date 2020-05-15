import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css'

const Input = (props) => {
  let inputElement = null;
  switch (props.inputelment) {
    case 'input':
      inputElement = <input id={props.id} className={styles.InputElement} {...props} />
      break;
    case 'textarea':
      inputElement = <textarea id={props.id} className={styles.InputElement} {...props} />
      break;
    default:
      inputElement = <input id={props.id} className={styles.InputElement} {...props} />
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
  inputelment: PropTypes.string
}

export default Input;
