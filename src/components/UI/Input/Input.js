import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.css';

const Input = props => {
  let inputClasses = [styles.InputElement];
  let labelClass;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.Invalid);
    labelClass = styles.InvalidLabel;
  }

  let inputElement;
  switch (props.elementType) {
    case 'input':
      inputElement =
        <Fragment>
          <label className={labelClass} htmlFor={props.id}>{props.label}</label>
          <input
            id={props.id}
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
        </Fragment>;
      break;
    case 'textarea':
      inputElement = (
        <Fragment>
          <label className={labelClass} htmlFor={props.id}>{props.label}</label>
          <textarea
            id={props.id}
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
        </Fragment>
      );

      break;
    case 'select':
      inputElement = (
        <Fragment>
          <label className={labelClass} htmlFor={props.id}>{props.label}</label>
          <select
            id={props.id}
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option => (
              <option key={option.value}
                      value={option.value}>{option.displayValue}</option>
            ))}
          </select>
        </Fragment>
      );
      break;
    default:
      inputElement = (
        <Fragment>
          <label className={labelClass} htmlFor={props.id}>{props.label}</label>
          <input
            id={props.id}
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />
        </Fragment>
      );
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError =
      <p className={styles.ValidationError}>
        Please enter a valid {props.valueType}!
      </p>;
  }

  return (
    <div className={styles.Input}>
      {inputElement}
      {validationError}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  elementType: PropTypes.string,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.object,
  valueType: PropTypes.string
};

export default Input;
