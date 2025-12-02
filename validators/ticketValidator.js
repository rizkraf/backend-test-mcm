const Validator = require('validatorjs');

const validatorRules = {
  create: {
    showtimeId: 'required|integer|min:1',
    customerName: 'required|string|min:1|max:150',
    customerEmail: 'required|email',
    customerPhone: 'required|string|min:1|max:20',
    seatNumber: 'required|string|min:1|max:50',
    quantity: 'required|integer|min:1',
    totalPrice: 'required|numeric|min:0',
    bookingDate: 'date'
  },
  update: {
    showtimeId: 'integer|min:1',
    customerName: 'string|min:1|max:150',
    customerEmail: 'email',
    customerPhone: 'string|min:1|max:20',
    seatNumber: 'string|min:1|max:50',
    quantity: 'integer|min:1',
    totalPrice: 'numeric|min:0',
    bookingDate: 'date'
  }
};

const customMessages = {
  'showtimeId.required': 'Showtime ID is required',
  'showtimeId.integer': 'Showtime ID must be an integer',
  'showtimeId.min': 'Showtime ID must be greater than 0',
  'customerName.required': 'Customer name is required',
  'customerName.string': 'Customer name must be a string',
  'customerName.min': 'Customer name must be at least 1 character',
  'customerName.max': 'Customer name must not exceed 150 characters',
  'customerEmail.required': 'Customer email is required',
  'customerEmail.email': 'Customer email must be a valid email',
  'customerPhone.required': 'Customer phone is required',
  'customerPhone.string': 'Customer phone must be a string',
  'customerPhone.min': 'Customer phone must be at least 1 character',
  'customerPhone.max': 'Customer phone must not exceed 20 characters',
  'seatNumber.required': 'Seat number is required',
  'seatNumber.string': 'Seat number must be a string',
  'seatNumber.min': 'Seat number must be at least 1 character',
  'seatNumber.max': 'Seat number must not exceed 50 characters',
  'quantity.required': 'Quantity is required',
  'quantity.integer': 'Quantity must be an integer',
  'quantity.min': 'Quantity must be at least 1',
  'totalPrice.required': 'Total price is required',
  'totalPrice.numeric': 'Total price must be a valid number',
  'totalPrice.min': 'Total price cannot be negative',
  'bookingDate.date': 'Booking date must be a valid date'
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
