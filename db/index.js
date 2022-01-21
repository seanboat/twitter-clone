const { client } = require('./client');

const {
  getAllUsers,
  getUserById,
  getTweetsByUserId,
  getHashtagsByTweetId,
  getLikesByTweetId,
  getFollowersByUserId,
} = require('./adapters');

module.exports = {
  client,
  getAllUsers,
  getUserById,
  getTweetsByUserId,
  getHashtagsByTweetId,
  getLikesByTweetId,
  getFollowersByUserId,
  testDB,
};

async function testDB(userId) {
  try {
    console.log('testing db adapters!');

    const allUsers = await getAllUsers();
    console.log({ allUsers });

    const user = await getUserById(userId);
    console.log({ user });

    const userTweets = await getTweetsByUserId(userId);
    console.log({ userTweets });

    const tweetId = userTweets[0].id;

    const firstTweetHashtags = await getHashtagsByTweetId(tweetId);
    console.log({ firstTweetHashtags });

    const firstTweetLikes = await getLikesByTweetId(tweetId);
    console.log({ firstTweetLikes });

    const userFollowers = await getFollowersByUserId(userId);
    console.log({ userFollowers });

    return {
      allUsers,
      user,
      userTweets,
      firstTweetHashtags,
      firstTweetLikes,
      userFollowers,
    };
  } catch (err) {
    throw err;
  }
}
