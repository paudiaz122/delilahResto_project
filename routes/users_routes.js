const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users_controllers');
const userMiddlewares = require('../middlewares/users_middlewares');
const generalMiddlewares = require('../middlewares/general_middlewares');

router.post('/login',
    generalMiddlewares.checkBody,
    userMiddlewares.requireRegisterData,
    userMiddlewares.validateUserCredentials,
    userControllers.loginUser
);

router.post('/register',
    generalMiddlewares.checkBody,
    userMiddlewares.requireLoginData,
    userMiddlewares.isDataValid,
    userControllers.registerUser
);

module.exports = router;