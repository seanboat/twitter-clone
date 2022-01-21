INSERT INTO users (username)
VALUES
  ('albert'),
  ('felix'),
  ('wally'),
  ('beatrice'),
  ('darla');

INSERT INTO tweets (content, author)
VALUES
  ('i love turtles!', 1),
  ('bunnies are so cool!', 2),
  ('alligators rule :)', 3),
  ('seals are very squishy :D', 4),
  ('i love dragons!', 5);

INSERT INTO hashtags (tag)
VALUES 
  ('#turtles'),
  ('#bunnies'),
  ('#alligators'),
  ('#seals'),
  ('#dragons');

INSERT INTO likes (user_id, tweet_id)
VALUES 
  (1, 2),
  (1, 4),
  (2, 1),
  (2, 3),
  (2, 4),
  (3, 4),
  (3, 5),
  (4, 1),
  (4, 5),
  (5, 2),
  (5, 3);

INSERT INTO user_followers (primary_id, follower_id)
VALUES
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 1),
  (2, 3),
  (2, 4),
  (2, 5),
  (3, 1),
  (3, 2),
  (3, 4),
  (3, 5),
  (4, 1),
  (4, 2),
  (4, 3),
  (4, 5),
  (5, 1),
  (5, 2),
  (5, 3),
  (5, 4);

INSERT INTO tweet_hashtags (tweet_id, hashtag_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);