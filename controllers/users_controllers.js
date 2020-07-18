const projectDatabase = require('../config/database');
const users_controllers = {};

users_controllers.validateUserCredentials = (req, res) => {
    const userCredentials = req.body;

};

users_controllers.registerUser = (req, res) => {
    const userData = req.body;
};

module.exports = users_controllers;