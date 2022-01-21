const { Client } = require('pg');
const CONNECTION_STRING = 'postgres://localhost:5432/twitter-clone';
const client = new Client(CONNECTION_STRING);

module.exports = {
  client,
  getAllUsers,
  getUserById,
  getTweetsByUserId,
  getHashtagsByTweetId,
  getFollowersByUserId,
};

// database adapters

// const getAllUsers = async () => {}
async function getAllUsers() {
  try {
    // business logic goes here :)
    const { rows: users } = await client.query(`
      SELECT * FROM users;
    `);

    return users;
  } catch (err) {
    // by throwing the error
    // we can send it up the foodchain in express
    // and log it in our morgan dev logging middleware
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
      WHERE users.id=$1;
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
      WHERE tweets.author=$1;
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
      SELECT hashtags.id, hashtags.tag FROM hashtags
      JOIN tweet_hashtags
      ON hashtags.id=tweet_hashtags.hashtag_id
      JOIN tweets
      ON tweets.id=tweet_hashtags.tweet_id
      WHERE tweets.id=$1;
    `,
      [tweetId]
    );

    return hashtags;
  } catch (err) {
    throw err;
  }
}

async function getFollowersByUserId(userId) {
  try {
    const { rows: followers } = await client.query(
      `
      SELECT followers.id, followers.username 
      FROM users 
      JOIN user_followers
      ON users.id=user_followers.primary_id
      JOIN users AS followers
      ON followers.id=user_followers.follower_id
      WHERE users.id=$1;
    `,
      [userId]
    );

    return followers;
  } catch (err) {
    throw err;
  }
}

// getAllUsers,x
//   getUserById,x
//   getTweetsByUserId,x
//   getHashtagsByTweetId,x
//   getFollowersByUserId,

async function testDB() {
  try {
    const users = await getAllUsers();
    console.log({ users });

    const user = await getUserById(1);
    console.log({ user });

    const userTweets = await getTweetsByUserId(1);
    console.log({ userTweets });

    const firstUserTweetId = userTweets[0].id;

    const firstUserTweetHashtags = await getHashtagsByTweetId(firstUserTweetId);
    console.log({ firstUserTweetHashtags });

    const firstUserFollowers = await getFollowersByUserId(1);
    console.log({ firstUserFollowers });
  } catch (err) {
    throw err;
  }
}

async function init() {
  try {
    await client.connect();
    await testDB();
  } catch (err) {
    throw err;
  }
}

init();
