/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const {
  addContact,
  deleteContact,
  getAll,
  getContactById,
  updateContact,
  updateFavoriteContactById
} = require('../../controllers/contacts');

router.get('/', getAll);

router.get('/:contactId', getContactById);

router.post('/', addContact);

router.put('/:contactId', updateContact);

router.delete('/:contactId', deleteContact);

router.patch('/:contactId/favorite', updateFavoriteContactById);

module.exports = router;
