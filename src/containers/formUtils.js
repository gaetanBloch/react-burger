import { updateObject } from '../shared/utils';

const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value != null && value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value != null && value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value != null && value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const handleChangedForm = (event, inputId, formKey, that) => {
  const updatedForm = updateObject(that.state[formKey], {
    [inputId]: updateObject(that.state[formKey][inputId], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          that.state[formKey][inputId].validation,
        ),
        touched: true
      }
    )
  });

  // Check for all inputs validity
  let formIsValid = true;
  Object.keys(updatedForm).forEach(inputId => {
    formIsValid = updatedForm[inputId].valid && formIsValid;
  });

  that.setState({ [formKey]: updatedForm, formIsValid: formIsValid });
};

export const initializeFormElement = (
  label,
  id,
  valueType,
  validationRules = null,
  placeholder = '',
  type = 'text',
) => {
  return {
    elementType: 'input',
    label: label,
    id: id,
    elementConfig: {
      type: type,
      placeholder: placeholder,
    },
    valueType: valueType,
    value: '',
    validation: {
      required: true,
      ...validationRules,
    },
    valid: false,
    touched: false,
  };
};
