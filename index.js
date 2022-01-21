const express = require('express');
const morgan = require('morgan');
const { client, testDB } = require('./db');
const PORT = 5500;
const server = express();
const apiRouter = require('./api');

server.use(morgan('dev'));
server.use(express.json());

server.get('/health', (req, res) => {
  res.send({ healthy: true });
});

server.get('/testdb/:userId', async (req, res, next) => {
  try {
    if (!isNaN(req.params.userId)) {
      const data = await testDB(req.params.userId);
      res.send({ data });
    } else {
      throw new Error('User id is not defined');
    }
  } catch (err) {
    next(err);
  }
});

server.use('/api', apiRouter);

server.use('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

server.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

const handle = server.listen(PORT, async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
    await client.end();
    throw err;
  }

  console.log(`server listening on port ${PORT}, database connected!`);
});

module.exports = { handle, PORT };
