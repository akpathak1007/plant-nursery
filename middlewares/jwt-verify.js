const jwt = require('jsonwebtoken');
const error = require('../classes/app-error');
const { _401, _400 } = require('../constants/http-constants');
const { grasp } = require('../utils/helpers');

const jwtVerify = grasp(async (req, res, next) => {
  let token = req.get('Authorization');
  if (!token) {
    error('Not token found.', _401);
  }
  if (!token.startsWith('Bearer ')) {
    error('Invalid JWT token.', 400);
  }
  token = token.split(' ')[1];
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      error(err.message, _400);
    }
    req.auth = payload;
    req.auth.token = token;
    next();
  });
});

module.exports = jwtVerify;