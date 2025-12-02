const studioService = require('../services/studioService');

exports.create = async (req, res) => {
  const result = await studioService.create(req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.findAll = async (req, res) => {
  const result = await studioService.findAll(req.query);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    count: result.count,
    error: result.error
  });
};

exports.findById = async (req, res) => {
  const result = await studioService.findById(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.update = async (req, res) => {
  const result = await studioService.update(req.params.id, req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.delete = async (req, res) => {
  const result = await studioService.deleteStudio(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

