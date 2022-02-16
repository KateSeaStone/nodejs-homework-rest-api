/* eslint-disable new-cap */
const { Contact } = require('../../models');
const createError = require('http-errors');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);

    if (!contactById) {
      throw new createError(404, "Not found");
    }
    res.json(contactById);
  }
  catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
};

module.exports = getContactById;