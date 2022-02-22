const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;

    const allContacts = await Contact.find({ owner: _id }, '-createdAt -updatedAt', { skip, limit: Number(limit) }).populate('owner', 'email');
    res.json(allContacts);
  }
  catch (error) {
    next(error);
  }
};

module.exports = getAll;