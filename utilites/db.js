const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "socialmedia",
  password: ""
});

module.exports = pool.promise();
