const Joi = require("joi");

const db = require("../../helpers/db.js");
const chainError = require("../../helpers/chainError.js");
const bcrypt = require("../../helpers/bcrypt.js");
const auth = require("../../middleware/auth.js");

const schema = Joi.object({
  username: Joi.string().alphanum().min(1).max(16).required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$")),
  email: Joi.string().email({ minDomainSegments: 2 }),
});

// schema.validate() promise wrapper
function validate(data) {
  return new Promise((resolve, reject) => {
    const { error, value } = schema.validate(data);
    if (error) reject({ message: error.details[0].message });
    else resolve(value);
  });
}

function validateEmail(data) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM users WHERE lower(email) = '${data.email.toLowerCase()}'`;
    db.query(sql, (error, result) => {
      if (result.length > 0)
        reject({ message: "User with that email already exists " });
      else if (error)
        reject({
          message:
            "This process can't be done at this time, please try again later.",
        });
      else resolve(data);
    });
  });
}

function validateName(data) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM users WHERE lower(username) = '${data.username.toLowerCase()}'`;
    db.query(sql, (error, result) => {
      if (error)
        reject({
          message:
            "This process can't be done at this time, please try again later.",
        });
      else if (result.length > 0)
        reject({ message: "User with that name already exists" });
      else resolve(data);
    });
  });
}

function searchId(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT username, profile, user_id, create_time FROM users WHERE user_id = '${id}'`;
    db.query(sql, (error, result) => {
      if (error) reject({ message: "Can't do that right now" });
      else if (result.length === 0) reject({ message: "User not found " });
      else resolve(result);
    });
  });
}

function getIdFromName(name) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT user_id FROM users WHERE lower(username) = '${name.toLowerCase()}'`;
    db.query(sql, (error, result) => {
      if (error) reject({ message: "DB error" });
      else if (result.length === 0)
        reject({ message: "Invalid username/password, try again" });
      else resolve(result[0].user_id);
    });
  });
}

function getHashById(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT password FROM users WHERE user_id = '${id}'`;
    db.query(sql, (error, result) => {
      if (error) reject({ message: "DB error" });
      else if (result.length === 0)
        reject({ message: "Invalid username/password, try again" });
      else resolve(result[0].password);
    });
  });
}

function insertUserToDb(data) {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(data.password)
      .then((hashedPassword) => {
        let sql = `INSERT INTO users (email, username, password) VALUES('${data.email}','${data.username}','${hashedPassword}')`;
        db.query(sql, (error, res) => {
          if (error) reject({ message: "DB error, try again later" });
          else resolve(res);
        });
      })
      .catch((error) => reject(error));
  });
}

function create(data) {
  return new Promise((resolve, reject) => {
    validate(data)
      .then(validateEmail, chainError)
      .then(validateName, chainError)
      .then(insertUserToDb, chainError)
      .then((response) => resolve(response), chainError)
      .catch((error) => reject({ status: "400", message: error.message }));
  });
}

function deleteById(id) {
  return new Promise((resolve, reject) => {
    searchId(id)
      .then((data) => {
        let sql = `DELETE FROM users WHERE user_id = '${id}'`;
        db.query(sql, (error, result) => {
          if (error) reject({ message: "DB failed" });
          else resolve("User deleted");
        });
      })
      .catch((error) => reject(error));
  });
}

function authenticate(data) {
  return new Promise((resolve, reject) => {
    getIdFromName(data.username)
      .then((id) => {
        var uid = id;
        return getHashById(id)
          .then((hashed) => bcrypt.compare(data.password, hashed), chainError)
          .then(
            (result) =>
              result === true
                ? auth.sign(uid)
                : reject({ message: "Invalid username/password" }),
            chainError
          )
          .then((token) => resolve(token))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
}

module.exports = {
  create,
  searchId,
  deleteById,
  authenticate,
};
