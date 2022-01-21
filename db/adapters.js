const { client } = require('./client');

module.exports = {
  getAllUsers,
  getUserById,
  getTweetsByUserId,
  getHashtagsByTweetId,
  getLikesByTweetId,
  getFollowersByUserId,
};

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
      SELECT * FROM users;
    `);

    return users;
  } catch (err) {
    throw err;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE id=$1;
    `,
      [userId]
    );

    return user;
  } catch (err) {
    throw err;
  }
}

async function getTweetsByUserId(userId) {
  try {
    const { rows: tweets } = await client.query(
      `
      SELECT * FROM tweets
      WHERE author=$1;
    `,
      [userId]
    );

    return tweets;
  } catch (err) {
    throw err;
  }
}

async function getHashtagsByTweetId(tweetId) {
  try {
    const { rows: hashtags } = await client.query(
      `
      SELECT * FROM hashtags
      JOIN tweet_hashtags
      ON tweet_hashtags.hashtag_id=hashtags.id
      WHERE tweet_id=$1;
    `,
      [tweetId]
    );

    return hashtags;
  } catch (err) {
    throw err;
  }
}

async function getLikesByTweetId(tweetId) {
  try {
    const {
      rows: [likes],
    } = await client.query(
      `
      SELECT COUNT(*) FROM likes
      WHERE likes.tweet_id=$1;
    `,
      [tweetId]
    );

    return likes;
  } catch (err) {
    throw err;
  }
}

async function getFollowersByUserId(userId) {
  try {
    const { rows: followers } = await client.query(
      `
      SELECT followers.id, followers.username FROM users
      JOIN user_followers
      ON user_followers.primary_id=$1
      JOIN users AS followers
      ON user_followers.follower_id=followers.id
      WHERE users.id=$1;
    `,
      [userId]
    );

    return followers;
  } catch (err) {
    throw err;
  }
}
