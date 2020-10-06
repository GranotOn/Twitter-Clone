const express = require("express");
const volleyball = require("volleyball");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const db = require("./helpers/db.js");
const auth = require("./middleware/auth.js");

const app = express();
const port = process.env.PORT || 4242;
const client = process.env.CLIENT || "http://localhost:3000";

app.use(volleyball);
app.use(cors({ credentials: true, origin: client }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1/user", require("./services/user/router"));

app.use("/api/v1/tweet", require("./services/tweet/router"));

app.use("/api/v1/followers", require("./services/followers/router"));

app.get("/auth", (req, res, next) => {
  const jwt = req.cookies.jwt;
  if (!jwt)
    next({
      status: 401,
      message: "You need to login to perform this action",
    });
  else {
    auth
      .verify(jwt)
      .then((response) => res.status(200).json(response))
      .catch((error) => next(error));
  }
});

/**
 * Error handler
 */

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Twitter-clone backend running on port ${port}`);
});

/**
 * MySql handlers
 */

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE twitter";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("database created..");
  });
});

app.get("/createusers", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS users ( \
      user_id INT NOT NULL AUTO_INCREMENT,\
      email VARCHAR(255) NOT NULL,\
      username VARCHAR(16) NOT NULL,\
      password VARCHAR(72) NOT NULL,\
      create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
      profile VARCHAR(2083) DEFAULT ('https://logodix.com/logo/1070739.jpg'),\
      UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,\
      PRIMARY KEY (user_id) )";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("users table created");
  });
});

app.get("/createtweets", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS tweets ( \
  tweet_id INT NOT NULL AUTO_INCREMENT, \
  content VARCHAR(128) NOT NULL, \
  creator_id INT NULL, \
  tweetscol VARCHAR(45) NULL, \
  likes INT DEFAULT 0, \
  comments INT DEFAULT 0, \
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\
  PRIMARY KEY (tweet_id) )";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("created tweets table");
  });
});

app.get("/createcomments", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS comments ( \
    comment_id INT NOT NULL AUTO_INCREMENT, \
    tweet_id INT NOT NULL, \
    creator_id INT NOT NULL,\
    content VARCHAR(128) NULL,\
    likes INT DEFAULT 0,\
    PRIMARY KEY (comment_id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("created comments table");
  });
});

app.get("/createlikes", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS likes ( \
    like_id INT NOT NULL AUTO_INCREMENT, \
    parent_id INT NOT NULL, \
    creator_id INT NOT NULL, \
    PRIMARY KEY (like_id))";

  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send("created likes table");
  });
});

app.get("/createfollowers", (req, res) => {
  let sql = 
    "CREATE TABLE IF NOT EXISTS followers ( \
      id INT NOT NULL AUTO_INCREMENT, \
      follower_id INT NOT NULL, \
      follows_id INT NOT NULL, \
      PRIMARY KEY (id))";
    
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send("created followers table");
  })
})