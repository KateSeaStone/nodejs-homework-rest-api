/* eslint-disable new-cap */
const { User, schemas } = require('../../models');
const { Unauthorized, createError } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized('Email or password is wrong');
    }

    // const passCompare = await bcrypt.compare(password, user.password);
    // OR

    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
      throw new Unauthorized('Email or password is wrong');
    }

    const payload = {
      id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email,
        subscription,
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;