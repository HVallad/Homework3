const Methods = require('http-methods-constants');

const { StatusCodes } = require('http-status-codes');
const logger = require('./logger');

function checkSpecRange(epoch) {
  const checkTime = parseInt(epoch, 10);
  const lowerBound = Date.now() - (5 * 60000);
  const higherBound = Date.now() + (5 * 60000);
  if (checkTime > lowerBound && checkTime < higherBound) {
    return true;
  }
  return false;
}

module.exports.blockDeleteMethod = (req, res, next) => {
  if (req.method === Methods.DELETE) {
    logger.log(3, req);
    res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  }
  next();
};

module.exports.dateValidator = (req, res, next) => {
  const dateQuery = req.query['date-validation'];
  const dateHeader = req.headers.datevalidation;
  if (dateQuery !== undefined && dateHeader !== undefined) {
    if (dateQuery === dateHeader && checkSpecRange(dateQuery)) {
      req.dateValidation = dateQuery;
      next();
    } else {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
  } else {
    const finalDate = dateQuery || dateHeader;
    if (!finalDate || !checkSpecRange(finalDate)) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    } else {
      req.dateValidation = finalDate;
      next();
    }
  }
};

module.exports.logRequest = (req, res, next) => {
  const assignmentRequirements = {
    epoch: Date.now(),
    HTTPVerb: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    headers: req.headers,
    dateValidation: req.dateValidation,
  };

  logger.log('info', assignmentRequirements);
  next();
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const errorMessage = `We're sorry, the error was: ${err.message}`;
  const errorContainer = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: errorMessage };

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorContainer);
  logger.log('error', JSON.stringify(errorContainer));
  return next();
};
