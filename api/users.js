const express = require('express');
const usersRouter = express.Router();
const { getAllUsers, getUserById } = require('../db');

module.exports = usersRouter;

usersRouter.get('/', async (_, res, next) => {
  try {
    // fat models, skinny routes
    // you want to encapsulate all your business logic in the
    // connectors to your persistence layer, ie database / storage
    // that way you expose minimal business logic to your routes
    // this keeps things easy to maintain!
    const users = await getAllUsers();
    res.send({ users });
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    // did we get a number?
    if (!isNaN(req.params.id)) {
      const user = await getUserById(req.params.id);
      res.send({ user });
    } else {
      // we're using serial primary key integers
      // not a great practice, much safer to use UUID
      // const {v4 as uuidv4} = require('uuid')
      // uuidv4() -> unique strings as records
      throw new Error('User not found');
    }
  } catch (err) {
    next(err);
  }
});
