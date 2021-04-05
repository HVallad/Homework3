const { StatusCodes } = require('http-status-codes');

module.exports.All = (req, res) => {
  if (Math.random() < 0.5) {
    res.status(StatusCodes.OK).json({ status: StatusCodes.OK, text: 'Hello World' });
  } else {
    throw new Error('Oops');
  }
};
