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

function getFollowers(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT follower_id FROM followers where follows_id = ${id}`;

    db.query(sql, (error, result) => {
      if (error)
        reject({ status: 500, message: "DB error, please try again later" });
      else resolve(result);
    });
  });
}

function getFollows(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT follows_id FROM followers where follower_id = ${id}`;

    db.query(sql, (error, result) => {
      if (error)
        reject({ status: 500, message: "DB error, please try again later" });
      else resolve(result);
    });
  });
}

module.exports = {
  add,
  remove,
  getFollowers,
  getFollows,
};
