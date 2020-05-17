export const initializeFormElement = (
  placeholder,
  valueType,
  validationRules = null,
  type = 'text',
) => {
  return {
    elementType: 'input',
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

export const checkValidity = (value, rules) => {
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
