const mysql = require("mysql2");
const dotenv = require("dotenv").config();

// Create a connection pool
const pool = mysql.createPool({
  // host: '10.30.10.12',
  // user: 'root',
  // password: 'password',
  // database: 'spl_lab',
  // port: 3306
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'db',
  port: 3307
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Connection failed:", err.message);
  } else {
    console.log("Connection success");
    connection.release(); // Release the connection back to the pool
  }
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
