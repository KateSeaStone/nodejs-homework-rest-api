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
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, { versionKey: false, timestamps: true });

const Contact = model('contact', contactSchema);

const joiAddContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const joiUpdateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required()
});

module.exports = {
  Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavorite: joiUpdateFavoriteSchemas
  }
};