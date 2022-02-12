/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { Contact, schemas } = require("../../models/contact");

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await Contact.find({}, '-createdAt -updatedAt');
    res.json(allContacts);
  }
  catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
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
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, "missing required name field");
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  }
  catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
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
});

router.delete('/:contactId', async (req, res, next) => {
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
});

router.patch('/:contactId/favorite', async (req, res, next) => {
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

});

module.exports = router;
