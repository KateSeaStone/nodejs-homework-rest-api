const { Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavorite: joiUpdateFavoriteSchemas
  } } = require('./contact');

const { User,
  schemas: {
    signup: signupJoiSchema
  }
} = require('./user');


module.exports = {
  Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavorite: joiUpdateFavoriteSchemas,
    signup: signupJoiSchema
  },
  User
};


