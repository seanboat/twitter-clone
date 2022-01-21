const express = require('express');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');

module.exports = usersRouter;

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (err) {
    next(err);
  }
});
