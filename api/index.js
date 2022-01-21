const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./users');

module.exports = apiRouter;

apiRouter.use('/users', usersRouter);
