const showtimeService = require('../services/showtimeService');

exports.create = async (req, res) => {
  const result = await showtimeService.create(req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.findAll = async (req, res) => {
  const result = await showtimeService.findAll(req.query);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    error: result.error
  });
};

exports.findById = async (req, res) => {
  const result = await showtimeService.findById(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.findByFilmId = async (req, res) => {
  const result = await showtimeService.findByFilmId(req.params.filmId);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.update = async (req, res) => {
  const result = await showtimeService.update(req.params.id, req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.delete = async (req, res) => {
  const result = await showtimeService.deleteShowtime(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};
