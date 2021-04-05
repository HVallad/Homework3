const { StatusCodes } = require('http-status-codes');

module.exports.All = (req, res) => {
  if (Math.random() < 0.5) {
    res.sendStatus(StatusCodes.OK);
  } else {
    throw new Error('Oops');
  }
};
