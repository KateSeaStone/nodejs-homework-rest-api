/* eslint-disable new-cap */
const { Contact, schemas } = require('../../models');
const createError = require('http-errors');

const updateFavoriteContactById = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavorite.validate(req.body);
    if (error) {
      throw new createError(404, 'missing field favorite');
    }

    const { contactId } = req.params;
    const favoriteContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!favoriteContact) {
      throw new createError(404, "Not found");
    }
    res.json(favoriteContact);

  } catch (error) {
    next(error);
  }

};

module.exports = updateFavoriteContactById;