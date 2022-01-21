# SQL + Express Practice: Twitter Clone

Let's build a twitter clone! We'll break the effort down into a few key parts:

## Database design

1. Design the schema or entity relation diagram (ERD)
2. Build the database setup and seed routines
3. Add database adapters to query our tables
4. Create a database test function to validate our adapters

## Express server

1. Build a simple express server with logging and a health endpoint (returning `{ healthy: true | false }`)
2. Add an `apiRouter` and a `usersRouter` to handle requests to `${base_url}/api/users`

## Bring it all together

1. Create a route `/api/testdb/:userId` that takes in a `userId` on the `req.params.userId` object and runs the database test function we wrote in **Database design** above on that particular relation
2. Write tests for each api route provided in `api.spec.js`, following the pattern established in the first test at `GET /api/users`

---

# Part One: Database Design

1.

To design our schema, let's think about what entities we'll need to capture the core elements of content distribution system like twitter. We've got a few key players that we'll want to describe:

- Users
- Tweets
- Hashtags

There are other relations that accompany these core entities, like:

- Followers, a type of User relation
- Likes, a type of User relation on a particular Tweet

Here's an example of how we could structure each of these relations:

![](/assets/twitter-clone-tables.png)

The complete ERD might look like this. Notice the use of different connectors, describing the 1:1, 1:many, and many:many relations that we're describing! For more info on ERDs and the way that we use _cardinality_ to refer to belongingness amongst entities, check out this awesome resource: https://vertabelo.com/blog/cardinality-in-data-modeling/

![](/assets/twitter-clone-erd.png)

---

2.

To build our database setup and seed routines, we'll need to execute a few SQl queries.

- First, build your tables with CREATE TABLE < name > statements. Remember, if a foreign key depends on another table's primary key value, the primary keyed table will need to be created first: else, there's no record to associate!

- Next, build your insert statements. These will INSERT INTO < name > ( ...fields ) VALUES ( ...comma-separated tuples ), ... . Use serial, auto-incrementing primary keys for ease of remembering which record refers to what entity!

- Now you can seed your database! You'll need to create a new database to store your relations with `createdb < db name >`, at which point you can `psql < db name >` and load your setup and seed routines (preferably written as separate `*.sql` files) with `\i < routine-name.sql >`

- Query your database by running `SELECT * ...` statements to verify that your database tables hold the data and relations you expect!

3.

Let's create database adapters by leveraging the `pg` Client constructor to build a client interface and issue SQL commands against our seeded database. Each adapter will be written in JavaScript, and should have the following qualities and characteristics:

- our client issues asynchronous calls, so we'll need an `async/await` compatible function
- name the function according to the data it fetches, eg if we're looking for all users in our twitter clone, `getAllUsers()` is a good choice :D
- build useful adapters for as many relations as you like! there are at least 4 key relationships between users, tweets, hashtags, likes, and followers, and potentially many more. think like a database architect (a DBA): what sorts of information will the twitter system require, and how can you create adapters to facilitate that data exchange?
