const { Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavorite: joiUpdateFavoriteSchemas
  } } = require('./contact');


module.exports = {
  Contact,
  schemas: {
    add: joiAddContactSchema,
    updateFavorite: joiUpdateFavoriteSchemas
  }
};


