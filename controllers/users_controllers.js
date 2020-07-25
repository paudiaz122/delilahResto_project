const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const projectDatabase = require('../config/database');
const users_controllers = {};

users_controllers.loginUser = async (req, res) => {
    const userName = res.locals.userPayload.userName;
    const isAdmin = res.locals.userPayload.isAdmin;

    const token = await JWT.sign({ userName: userName, isAdmin: isAdmin }, JWTSign);

    res.status(200).json({
        message: 'Successfully logged in.',
        token
    });
};

users_controllers.registerUser = async (req, res) => {
    const userData = req.body;

    const newUser = await projectDatabase.usersModel.create(userData)
    .catch(err => {
        console.log('Unable to create user.');
        catchDatabaseEror(err, res);
    });

    res.status(201).json({
        message: 'User created',
        newUser
    });
};

//Funciones auxiliares
//Capto error en base de datos
const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
};

module.exports = users_controllers;