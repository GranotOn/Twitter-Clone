const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_ADDR,
  user: "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql connected");
});

module.exports = db;