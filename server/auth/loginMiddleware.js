const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const key = process.env.JWT_KEY;
const mysql = require("mysql");
const db = require("../database/db.js");

const verifyToken = async function (req, res, next) {
  const idToken = req.body.res.access_token;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${idToken}`
    );
    const tokenInfo = response.data;
    res.locals.payload = response.data;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};

const createToken = (result) => {
  try {
    JSON.parse(JSON.stringify(result));
    // console.log(key)
    const token = jwt.sign(
      {
        user_id: result[0].faculty_id,
        user_name: result[0].name,
        email_id: result[0].email_id,
        dept_code: result[0].department_code,
        role: result[0].role,
      },
      key,
      { expiresIn: "12h" }
    );
    return token;
  } catch (error) {
    console.log(error)
  }

};

const createSession = function (req, res, next) {
  // console.log(res.locals.payload);
  const email = res.locals.payload.email;
  db.query("SELECT * FROM faculty WHERE email_id = ? ", [email])
    .then((response) => {
      if (response.length <= 0) {
        return res.status(401).json({ error: "Unauthorised Access" });
      } else if (response.statusCode == 400) {
        return res.status(400).json({ error: "Unauthorised Access" });
      } else {
        const token = createToken(response);
        res.locals.token = token;
        next();
      }
    })
    .catch((error) => {
      return res.status(400).json({ error: "There was some error" })
    });
};

const authenticate = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Not Authorized");
  }
  try {
    const response = jwt.verify(token, key);
    next();
  } catch (error) {
    return res.status(401).send("Session Expired");
  }
}

const credentialLogin = async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const result1 = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
        throw new Error("Some Error");
      })
    })
    if (result1.length != 1) {
      return res.status(401).json({ "data": "User Not Found" });
    }
    res.locals.payload = {email : result1[0].email}
    next();
  } catch (error) {
    return res.status(400).json({ error: "Unauthorised Access" });
  }
}

const getUser = function (req, res, next) {
  const token = req.body.token;
  try {
    const data = jwt.verify(token, key);
    return res.send(data);
  } catch (error) {
    return res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = {
  verifyToken: verifyToken,
  createSession: createSession,
  getUser: getUser,
  authenticate: authenticate,
  credentialLogin: credentialLogin
};
