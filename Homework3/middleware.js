const Methods = require('http-methods-constants');

const { StatusCodes } = require('http-status-codes');

module.exports.blockDeleteMethod = (req, res, next) => {
  if (req.method === Methods.DELETE) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
  next();
};

module.exports.dateValidator = (req, res, next) => {
  next();
};

module.exports.logRequest = (req, res, next) => {
  next();
};

module.exports.errorHandler = (err, req, res, next) => {
  next(err);
};
