const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const key = process.env.JWT_KEY;
const mysql = require("mysql");
const db = require("../database/db.js");

const clientId =
  "494572126295-g8ok8a5g0kvr3ceodj12h5orod5oe38v.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

const verifyToken = async function (req, res, next) {
  const idToken = req.body.res.access_token;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${idToken}`
    );
    const tokenInfo = response.data;
    res.locals.payload = response.data;
    next();
    // console.log("Token verified successfully:", tokenInfo);
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};

const createToken = (result) => {
    try{
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
        key
      );
      console.log(token);
      return  token;
    }catch(error){
      console.log(error)
    }
    
};

const createSession = function (req, res, next) {
  // console.log(res.locals.payload);
  const email = res.locals.payload.email;
  db.query("SELECT * FROM faculty WHERE email_id = ? ", [email])
    .then((response) => {
      if(response.length <= 0) {
        res.status(401).json({ error: "Unauthorised Access" });
      }else if(response.statusCode == 400) {
        res.status(400).json({ error: "Unauthorised Access" });
      }else{
        const token = createToken(response);
        res.locals.token = token;
        next();
      }
    })
    .catch((error) => {
      res.status(400).json({ error: "There was some error" })
    });
};

const getUser = function (req, res, next) {
  const token = req.body.token;
  try {
    const data = jwt.verify(token, key);
    res.send(data);
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = {
  verifyToken: verifyToken,
  createSession: createSession,
  getUser: getUser,
};
