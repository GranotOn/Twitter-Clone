const db = require("../../helpers/db.js");

function add({ follower_id, follows_id }) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO followers (follower_id, follows_id) VALUES (${follower_id}, ${follows_id}) `;

    db.query(sql, (error, result) => {
      if (error)
      reject({ status: 500, message: "DB error, please try again later" });
      else resolve(result);
    });
  });
}

function remove({ follower_id, follows_id }) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM followers WHERE follower_id = ${follower_id} AND follows_id = ${follows_id}`;

    db.query(sql, (error, result) => {
      if (error)
        reject({ status: 500, message: "DB error, please try again later" });
      else resolve(result);
    });
  });
}

function getFollowers(id, full) {
  return new Promise((resolve, reject) => {
    if (full) var sql = `SELECT followers.follower_id, users.username, users.profile \ FROM followers \ INNER JOIN users \ ON followers.follower_id = users.user_id AND followers.follows_id = ${id}`
    else var sql = `SELECT follower_id FROM followers where follows_id = ${id}`;

    db.query(sql, (error, result) => {
      if (error) {
        console.warn(error);
        reject({ status: 500, message: "DB error, please try again later" });
      }
      else resolve(result);
    });
  });
}

function getFollows(id, full) {
  return new Promise((resolve, reject) => {
    if (full) var sql = `SELECT followers.follows_id, users.username, users.profile \ FROM followers \ INNER JOIN users \ ON followers.follows_id = users.user_id AND followers.follower_id = ${id}`
    else var sql = `SELECT follows_id FROM followers where follower_id = ${id}`;

    db.query(sql, (error, result) => {
      if (error)
        reject({ status: 500, message: "DB error, please try again later" });
      else resolve(result);
    });
  });
}

function isFollowing(follower, followed) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM followers WHERE follower_id = ${follower} AND follows_id = ${followed}`
    db.query(sql, (error, result) => {
      if (error) reject({message: "DB error"});
      else {
        if (result.length === 0) resolve(false);
        else resolve(true);
      }
    })
  });
}

module.exports = {
  add,
  remove,
  getFollowers,
  getFollows,
  isFollowing,
};
