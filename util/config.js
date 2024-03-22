require('dotenv').config()

let JWT_KEY = process.env.JWT_KEY
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
let PORT = process.env.PORT

module.exports = {
  JWT_KEY,
  MONGODB_URI,
  PORT,
}
