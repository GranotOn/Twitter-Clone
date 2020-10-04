const db = require("../../helpers/db");
const Followers = require("../followers/followers.js");
const chainError = require("../../helpers/chainError");

function createTweet({ content, creator_id }) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO tweets (content, creator_id) VALUES('${content}', '${creator_id}')`;
    db.query(sql, (error, result) => {
      if (error) reject({ status: 500, message: "DB error, try again later" });
      else resolve(result);
    });
  });
}

function getTweetsByUser(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT tweet_id, content, create_time, likes, comments FROM tweets WHERE creator_id = ${id}`;
    db.query(sql, (error, result) => {
      if (error) reject({ status: 500, message: "DB Error, try again later" });
      else resolve(result);
    });
  });
}

function getTweetFromId(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT creator_id, content, create_time, likes, comments FROM tweets WHERE tweet_id = ${id}`;
    db.query(sql, (error, result) => {
      if (error) reject({ status: 500, message: "DB error, try again later" });
      else resolve(result);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM tweets WHERE tweet_id = ${id}`;
    db.query(sql, (error, result) => {
      if (error) reject({ status: 500, message: "DB error, try again later" });
      else resolve(result);
    });
  });
}

function update(id, data) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE tweets SET ${data} WHERE tweet_id = ${id}`;

    db.query(sql, (error, result) => {
      if (error) {
        reject({ status: 500, message: "DB error, try again later" });
      } else resolve(result);
    });
  });
}

function getFeed(id, limit, offset) {
  return new Promise((resolve, reject) => {
    Followers.getFollows(id)
      .then((obj) => {
        if (obj[0] === undefined) reject({ status: 400, message: "No follows" });

        //Extract all id's from list and put into array
        const follows = Object.values(obj[0]);

        let sql = `SELECT users.user_id, users.username, users.profile, tweets.tweet_id, tweets.content, tweets.likes, tweets.comments, tweets.create_time \ FROM users \ INNER JOIN tweets \ ON users.user_id = tweets.creator_id AND users.user_id IN (${follows.join()}) \ ORDER BY tweets.create_time \ LIMIT ${limit} \ OFFSET ${offset}`;

        db.query(sql, (error, result) => {
          if (error) reject({ message: "DB error" });
          else resolve(result);
        });
      })
      .catch((error) => reject(error));
  });
}
module.exports = {
  createTweet,
  getTweetsByUser,
  getTweetFromId,
  remove,
  update,
  getFeed,
};
