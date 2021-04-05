const App = require('express').Router();

const { StatusCodes } = require('http-status-codes');

module.exports.All = App.all('/', (req, res) => {
  if (Math.random() < 0.5) {
    res.sendStatus(StatusCodes.OK);
  } else {
    throw new Error('Oops');
  }
});
