const Validator = require('validatorjs');

const validatorRules = {
  create: {
    filmId: 'required|integer|min:1',
    showDate: 'required|date',
    showTime: 'required|string',
    screen: 'required|string|min:1|max:50',
    availableSeats: 'required|integer|min:0',
    totalSeats: 'required|integer|min:1',
    ticketPrice: 'required|numeric|min:0'
  },
  update: {
    filmId: 'integer|min:1',
    showDate: 'date',
    showTime: 'string',
    screen: 'string|min:1|max:50',
    availableSeats: 'integer|min:0',
    totalSeats: 'integer|min:1',
    ticketPrice: 'numeric|min:0'
  }
};

const customMessages = {
  'filmId.required': 'Film ID is required',
  'filmId.integer': 'Film ID must be an integer',
  'filmId.min': 'Film ID must be greater than 0',
  'showDate.required': 'Show date is required',
  'showDate.date': 'Show date must be a valid date',
  'showTime.required': 'Show time is required',
  'showTime.string': 'Show time must be a string',
  'screen.required': 'Screen is required',
  'screen.string': 'Screen must be a string',
  'screen.min': 'Screen must be at least 1 character',
  'screen.max': 'Screen must not exceed 50 characters',
  'availableSeats.required': 'Available seats is required',
  'availableSeats.integer': 'Available seats must be an integer',
  'availableSeats.min': 'Available seats cannot be negative',
  'totalSeats.required': 'Total seats is required',
  'totalSeats.integer': 'Total seats must be an integer',
  'totalSeats.min': 'Total seats must be at least 1',
  'ticketPrice.required': 'Ticket price is required',
  'ticketPrice.numeric': 'Ticket price must be a valid number',
  'ticketPrice.min': 'Ticket price cannot be negative'
};

const validateInput = (data, type = 'create') => {
  const validator = new Validator(data, validatorRules[type], customMessages);

  if (validator.fails()) {
    return {
      success: false,
      errors: validator.errors
    };
  }

  return {
    success: true
  };
};

const validateId = (id) => {
  const validator = new Validator({ id }, { id: 'required|integer|min:1' });

  if (validator.fails()) {
    return {
      success: false,
      errors: validator.errors
    };
  }

  return {
    success: true
  };
};

module.exports = {
  validateInput,
  validateId
};
