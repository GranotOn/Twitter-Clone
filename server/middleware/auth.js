const jwt = require("jsonwebtoken");

function sign(id) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {id: id},
      process.env.JWT_KEY,
      { expiresIn: '48h' },
      (error, token) => {
        if (error)
          reject({ message: "Token service unavailable, try again later" });
        else resolve(token);
      }
    );
  });
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) reject({ message: "authentication failed" });
      else resolve(decoded);
    });
  });
}

module.exports = {
  sign,
  verify,
};
