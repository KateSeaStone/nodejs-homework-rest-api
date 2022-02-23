/* eslint-disable new-cap */
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token === null) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized';
    }
    next(error);
  }
};

module.exports = authentication;