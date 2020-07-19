const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const users_middlewares = {};

//Capto error en base de datos
const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
};

//Seguro que no anda
users_middlewares.validateAdminUser = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const verify = JWT.verify(auth, JWTSign, (err, decoded) => {
            if (nosequevaaca) {

            } else {
                res.status(403).json({
                    message: 'Permisos no válidos'
                });
            }
        });
    }
    catch (err) {
        res.status(401).json({
            message: 'Token no válido'
        });
    }
};

users_middlewares.requireRegisterData = async (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    if(typeof(userName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the username provided'
        });
    } else if (typeof(password) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the password provided'
        });
    } else if (typeof(fullName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the name provided'
        });
    } else if (typeof(email) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the email provided'
        });
    } else if (typeof(phoneNumber) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the phone number provided'
        });
    } else if (typeof(address) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the address provided'
        });
    } else {
        next();
    }
};

users_middlewares.requireLoginData = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    if(typeof(userName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the username provided'
        });
    } else if (typeof(password) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the password provided'
        });
    } else {
        next();
    }
};

users_middlewares.validateUserCredentials = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const userFound = await projectDatabase.usersModel.findOne({
        where: { userName: userName, password: password }
    }).catch(err => catchDatabaseEror(err, res));

    if(!userFound) {
        res.status(404).json({
            message: 'Usuario o contraseña inválidos.'
        });
    } else {
        next();
    }

};

users_middlewares.isDataValid = async (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;

    const isUserNameValid = await projectDatabase.usersModel.findOne({
        where: { userName: userName }
    }).catch(err => catchDatabaseEror(err, res));

    const isEmailValid = await projectDatabase.usersModel.findOne({
        where: { email: email }
    }).catch(err => catchDatabaseEror(err, res));

    if(!isUserNameValid) {
        res.status(500).json({
            message: 'Nombre de usuario ya existente.'
        });
    } else if (!isEmailValid) {
        res.status(500).json({
            message: 'Email ya registrado.'
        });
    } else {
        next();
    }
};

module.exports = users_middlewares;