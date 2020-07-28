const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const projectDatabase = require('../config/database');
const users_controllers = {};

users_controllers.loginUser = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const userFound = await projectDatabase.usersModel.findOne({
        where: { userName: userName, password: password }
    }).catch(err => catchDatabaseEror(err, res));

    if(!userFound) {
        res.status(404).json({
            message: 'Username or password invalid.'
        });
    } else {
        res.locals.userPayload = userFound;
        const token = await JWT.sign({ id: userFound.id, userName: userFound.userName, isAdmin: userFound.isAdmin }, JWTSign);

        res.status(200).json({
            message: 'Successfully logged in.',
            token
        });
    }
};

users_controllers.registerUser = async (req, res) => {
    const userData = req.body;

    const newUser = await projectDatabase.usersModel.create(userData)
    .catch(err => {
        console.log('Unable to create user.');
        catchDatabaseEror(err, res);
    });

    res.status(201).json({
        message: 'User created.',
        newUser
    });
};

//Funciones auxiliares
//Capto error en base de datos
const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = users_controllers;