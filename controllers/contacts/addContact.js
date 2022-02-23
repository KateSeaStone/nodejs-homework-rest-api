/* eslint-disable new-cap */
const { Contact, schemas } = require('../../models');
const createError = require('http-errors');

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, "missing required name field");
    }
    const data = { ...req.body, owner: req.user._id };
    const newContact = await Contact.create(data);
    res.status(201).json(newContact);
  }
  catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = addContact;

