const express = require('express');
const morgan = require('morgan');
const { client } = require('./db/adapters');
const server = express();
const PORT = 5500;

const { testDB } = require('./db/index');

server.use(morgan('dev'));
server.use(express.json());

server.get('/health', (_, res) => {
  try {
    res.send({ healthy: true });
  } catch (err) {
    res.send({ healthy: false });
  }
});

server.get('/testdb', () => {
  testDB();
});

const handle = server.listen(PORT, async () => {
  try {
    console.log(`server listening on port ${PORT}`);
    await client.connect();
  } catch (err) {
    await client.end();
  }
});

module.exports = { handle };
