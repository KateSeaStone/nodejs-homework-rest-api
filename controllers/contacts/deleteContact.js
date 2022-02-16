/* eslint-disable new-cap */
const { Contact } = require('../../models');
const createError = require('http-errors');

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await Contact.findByIdAndDelete(contactId);

    if (!removedContact) {
      throw new createError(404, "Not found");
    }
    // res.json(removedContact);
    res.json({ message: "contact deleted" });

  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;