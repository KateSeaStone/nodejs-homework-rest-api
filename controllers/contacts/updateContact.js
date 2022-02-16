/* eslint-disable new-cap */
const { Contact, schemas } = require('../../models');
const createError = require('http-errors');

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, "missing fields");
    }
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!updatedContact) {
      throw new createError(404, "Not found");
    }
    res.json(updatedContact);
  }
  catch (error) {
    next(error);
  }
};

module.exports = updateContact;