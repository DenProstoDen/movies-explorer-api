// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require('express-rate-limit');

const {
  PORT = 3000,
  NODE_ENV = 'production',
  JWT_SECRET = '36fbec1934f82c924f4a55b942dcb8c97a478960d7016a5b50f91bcc36d3381a',
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const LIMITER = rateLimit({
  windowMs: 1000 * 60 * 5,
  max: 100,
});

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  LIMITER,
};
