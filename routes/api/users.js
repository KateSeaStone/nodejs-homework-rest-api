const express = require('express');
const router = express.Router();
const { authentication } = require('../../middlewares');

const { signup, login, getCurrentUser, logout } = require('../../controllers/users');
// const { joiSchema } = require('../../models/user');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', authentication, logout);
router.get('/current', authentication, getCurrentUser);


module.exports = router;