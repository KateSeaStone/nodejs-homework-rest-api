/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const { User, schemas } = require('../../models');
const { Conflict, createError } = require('http-errors');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      throw new createError(400, 'Bad Request');
    }

    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict('Email in use');
    }


    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);
    // OR

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({
      password: hashPassword,
      email,
      subscription
    });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;