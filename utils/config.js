const {
  PORT = 3000,
  NODE_ENV = 'production',
  JWT_SECRET = '36fbec1934f82c924f4a55b942dcb8c97a478960d7016a5b50f91bcc36d3381a',
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
};