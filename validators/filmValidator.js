const Validator = require('validatorjs');

const validatorRules = {
  create: {
    title: 'required|string|min:1|max:200',
    genre: 'required|string|min:1|max:50',
    releaseDate: 'required|date',
    duration: 'required|integer|min:1|max:500',
    director: 'required|string|min:1|max:150',
    synopsis: 'string|max:2000',
    rating: 'numeric|min:0|max:10',
    studioId: 'required|integer|min:1'
  },
  update: {
    title: 'string|min:1|max:200',
    genre: 'string|min:1|max:50',
    releaseDate: 'date',
    duration: 'integer|min:1|max:500',
    director: 'string|min:1|max:150',
    synopsis: 'string|max:2000',
    rating: 'numeric|min:0|max:10',
    studioId: 'integer|min:1'
  }
};

const customMessages = {
  'title.required': 'Film title is required',
  'title.string': 'Film title must be a string',
  'title.min': 'Film title must be at least 1 characters',
  'title.max': 'Film title must not exceed 200 characters',
  'genre.required': 'Genre is required',
  'genre.string': 'Genre must be a string',
  'genre.min': 'Genre must be at least 1 characters',
  'genre.max': 'Genre must not exceed 50 characters',
  'releaseDate.required': 'Release date is required',
  'releaseDate.date': 'Release date must be a valid date',
  'duration.required': 'Duration is required',
  'duration.integer': 'Duration must be an integer',
  'duration.min': 'Duration must be at least 1 minute',
  'duration.max': 'Duration cannot exceed 500 minutes',
  'director.required': 'Director is required',
  'director.string': 'Director must be a string',
  'director.min': 'Director name must be at least 1 characters',
  'director.max': 'Director name must not exceed 150 characters',
  'synopsis.string': 'Synopsis must be a string',
  'synopsis.max': 'Synopsis cannot exceed 2000 characters',
  'rating.numeric': 'Rating must be a valid number',
  'rating.min': 'Rating must be at least 0',
  'rating.max': 'Rating cannot exceed 10',
  'studioId.required': 'Studio ID is required',
  'studioId.integer': 'Studio ID must be an integer',
  'studioId.min': 'Studio ID must be greater than 0'
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
