require("dotenv").config();

let JWT_KEY = process.env.JWT_KEY;
let MONGODB_URI = process.env.MONGODB_URI;
let PORT = process.env.PORT;

module.exports = {
  JWT_KEY,
  MONGODB_URI,
  PORT,
};
