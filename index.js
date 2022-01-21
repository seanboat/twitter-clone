const express = require('express');
const server = express();
const PORT = 5500;
const morgan = require('morgan');
const { client, testDB } = require('./db');
const apiRouter = require('./api');

server.use(morgan('dev'));
server.use(express.json());

server.use('/api', apiRouter);

server.get('/health', (_, res) => {
  try {
    res.send({ healthy: true });
  } catch (err) {
    res.send({ healthy: false });
  }
});

server.get('/testdb/:userId', async (req, res, next) => {
  try {
    const testData = await testDB(req.params.userId);
    res.send(testData);
  } catch (err) {
    next(err);
  }
});

const handle = server.listen(PORT, async () => {
  try {
    await client.connect();
    console.log('db client connected!');
  } catch (err) {
    console.error(err);
    await client.end();
    throw err;
  }

  console.log(`server listening on port ${PORT}`);
});

module.exports = { handle, PORT };
