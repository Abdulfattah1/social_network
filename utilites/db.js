const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "socialmedia",
  password: ""
});

module.exports = pool.promise();
