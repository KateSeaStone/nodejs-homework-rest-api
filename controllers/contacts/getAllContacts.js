const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const allContacts = await Contact.find({}, '-createdAt -updatedAt');
    res.json(allContacts);
  }
  catch (error) {
    next(error);
  }
};

module.exports = getAll;