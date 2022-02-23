/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const { authentication } = require('../../middlewares');

const {
  addContact,
  deleteContact,
  getAll,
  getContactById,
  updateContact,
  updateFavoriteContactById
} = require('../../controllers/contacts');

router.get('/', authentication, getAll);

router.get('/:contactId', getContactById);

router.post('/', authentication, addContact);

router.put('/:contactId', updateContact);

router.delete('/:contactId', deleteContact);

router.patch('/:contactId/favorite', updateFavoriteContactById);

module.exports = router;
