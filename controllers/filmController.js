const filmService = require('../services/filmService');

exports.create = async (req, res) => {
  const result = await filmService.create(req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.findAll = async (req, res) => {
  const result = await filmService.findAll(req.query);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    pagination: result.pagination,
    error: result.error
  });
};

exports.findById = async (req, res) => {
  const result = await filmService.findById(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.update = async (req, res) => {
  const result = await filmService.update(req.params.id, req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.delete = async (req, res) => {
  const result = await filmService.deleteFilm(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

