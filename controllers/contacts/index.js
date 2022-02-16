const getAll = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const deleteContact = require("./deleteContact");
const updateFavoriteContactById = require("./updateFavoriteContactById");

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  updateFavoriteContactById,
  deleteContact
};