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
  const updatedOrderForm = { ...that.state[formKey] };
  const updatedFormElement = { ...updatedOrderForm[inputId] };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = checkValidity(
    updatedFormElement.value,
    updatedFormElement.validation,
  );
  updatedFormElement.touched = true;
  updatedOrderForm[inputId] = updatedFormElement;

  // Check for all inputs validity
  let formIsValid = true;
  Object.keys(updatedOrderForm).forEach(inputId => {
    formIsValid = updatedOrderForm[inputId].valid && formIsValid;
  });

  that.setState({ [formKey]: updatedOrderForm, formIsValid: formIsValid });
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
