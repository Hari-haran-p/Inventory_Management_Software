const mysql = require("mysql");
const dotenv = require("dotenv").config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST_LOCALHOST,
  user: process.env.DB_USERNAME_LOCAL,
  password: process.env.DB_PASSWORD_LOCAL,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT_LOCAL
});

module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  },
  close: () => {
    pool.end();
  },
  getConnection: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          return reject(error);
        }
        resolve(connection);
      });
    });
  },
};
