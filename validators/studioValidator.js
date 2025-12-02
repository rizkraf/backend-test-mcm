const Validator = require('validatorjs');

const validatorRules = {
  create: {
    name: 'required|string|min:3|max:100',
    location: 'required|string|min:5|max:255',
  },
  update: {
    name: 'string|min:3|max:100',
    location: 'string|min:5|max:255',
  }
};

const customMessages = {
  'name.required': 'Studio name is required',
  'name.string': 'Studio name must be a string',
  'name.min': 'Studio name must be at least 3 characters',
  'name.max': 'Studio name must not exceed 100 characters',
  'location.required': 'Location is required',
  'location.string': 'Location must be a string',
  'location.min': 'Location must be at least 5 characters',
  'location.max': 'Location must not exceed 255 characters',
};

const validateInput = (data, type = 'create') => {
  const validator = new Validator(data, validatorRules[type], customMessages);

  if (validator.fails()) {
    return {
      success: false,
      errors: validator.errors.all()
    };
  }

  return {
    success: true,
    errors: null
  };
};

const validateId = (id) => {
  const validator = new Validator(
    { id },
    { id: 'required|integer' },
    { 'id.required': 'ID is required', 'id.integer': 'ID must be an integer' }
  );

  if (validator.fails()) {
    return {
      success: false,
      errors: validator.errors.all()
    };
  }

  return {
    success: true,
    errors: null
  };
};

module.exports = {
  validateInput,
  validateId,
  validatorRules,
  customMessages
};
