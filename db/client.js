const { Client } = require('pg');
const DB_NAME = 'twitter-clone';
const client = new Client(`postgres://localhost:5432/${DB_NAME}`);

module.exports = { client };
