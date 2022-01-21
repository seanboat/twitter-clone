CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL
);

CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author INTEGER REFERENCES users (id)
);

CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(50) NOT NULL
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  tweet_id INTEGER REFERENCES tweets (id)
);

CREATE TABLE tweet_hashtags (
  tweet_id INTEGER REFERENCES tweets (id),
  hashtag_id INTEGER REFERENCES hashtags (id),
  UNIQUE(tweet_id, hashtag_id)
);

CREATE TABLE user_followers (
  primary_id INTEGER REFERENCES users (id),
  follower_id INTEGER REFERENCES users (id),
  UNIQUE(primary_id, follower_id)
);