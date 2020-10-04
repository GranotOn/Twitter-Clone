const bcrypt = require("bcrypt");

const saltRounds = 10;

function hash(password) {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, saltRounds)
      .then((hash) => resolve(hash))
      .catch((error) => reject({ message: error }));
  });
}

function compare(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hash)
      .then((result) => {
        if (!result)
          reject({ message: "Invalid username/password, try again" });
        else resolve(true);
      })
      .catch((error) => reject(error));
  });
}

module.exports = {
  hash,
  compare,
};
