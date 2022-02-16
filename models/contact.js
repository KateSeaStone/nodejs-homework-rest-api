const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  favorite: {
    type: Boolean,
    default: false
  }
}, { versionKey: false, timestamps: true });


const joiAddContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const joiUpdateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required()
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavorite: joiUpdateFavoriteSchemas
  }
};