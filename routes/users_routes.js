const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users_controllers');
const userMiddlewares = require('../middlewares/users_middlewares');

router.post('/login', userMiddlewares.requireRegisterData, userControllers.validateUserCredentials);
router.post('/register', userMiddlewares.requireLoginData, userControllers.registerUser);

module.exports = router;