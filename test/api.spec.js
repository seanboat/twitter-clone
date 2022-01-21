const axios = require('axios');
const { handle, PORT } = require('../index');
const { client } = require('../db');
const API_URL = `http://localhost:${PORT}/api`;

describe('api tests', () => {
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  describe('users router', () => {
    test('GET /users', async () => {
      const {
        data: { users },
        status,
      } = await axios.get(`${API_URL}/users`);

      expect(status).toBe(200);
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBe(5);
      expect(users[0].username).toBe('albert');
    });

    // test('GET /users/:userId/followers', async () => {});

    // test('POST /users/:userId/followers', async () => {});

    // test('DELETE /users/:userId/followers/:followerId', async () => {});

    // test('GET /users/:userId/tweets', async () => {});
  });

  // describe('tweets router', () => {
  //   test('GET /tweets/trending', async () => {});

  //   test('GET /tweets/:tweetId', async () => {});

  //   test('GET /tweets/:tweetId/hashtags', async () => {});

  //   test('POST /tweets/:tweetid/hashtags', async () => {});

  //   test('POST /tweets', async () => {});

  //   test('PATCH /tweets/:tweetId', async () => {});

  //   test('DELETE /tweets/:tweetId', async () => {});

  //   test('POST /tweets/:tweetId/likes', async () => {});

  //   test('DELETE /tweets/:tweetId/likes/:likeId', async () => {});
  // });
});
