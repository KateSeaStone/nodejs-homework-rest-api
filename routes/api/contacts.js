/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Joi = require("joi");
const contactsFunc = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contactsFunc.listContacts();
    res.json(allContacts);
  }
  catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsFunc.getContactById(contactId);

    if (!contactById) {
      throw new createError(404, "Not found");
    }
    res.json(contactById);
  }
  catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw new createError(400, "missing required name field");
    }
    const { name, email, phone } = req.body;
    const newContact = await contactsFunc.addContact(name, email, phone);
    res.status(201).json(newContact);
  }
  catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw new createError(400, "missing fields");
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await contactsFunc.updateContact(contactId, name, email, phone);

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
    const removedContact = await contactsFunc.removeContact(contactId);

    if (!removedContact) {
      throw new createError(404, "Not found");
    }
    // res.json(removedContact);
    res.json({ message: "contact deleted" });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
