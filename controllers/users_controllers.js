const projectDatabase = require('../config/database');
const users_controllers = {};

//Capto error en base de datos
const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
};

users_controllers.loginUser = (req, res) => {
    const userData = req.body;
};

users_controllers.registerUser = (req, res) => {
    const userData = req.body;
};

module.exports = users_controllers;