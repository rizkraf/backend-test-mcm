const ticketService = require('../services/ticketService');

exports.create = async (req, res) => {
  const result = await ticketService.create(req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.findAll = async (req, res) => {
  const result = await ticketService.findAll(req.query);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    error: result.error
  });
};

exports.findById = async (req, res) => {
  const result = await ticketService.findById(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.update = async (req, res) => {
  const result = await ticketService.update(req.params.id, req.body);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};

exports.delete = async (req, res) => {
  const result = await ticketService.deleteTicket(req.params.id);
  res.status(result.statusCode).json({
    success: result.success,
    message: result.message,
    data: result.data,
    errors: result.errors,
    error: result.error
  });
};
